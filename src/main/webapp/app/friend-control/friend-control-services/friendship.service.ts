import { CSRFService } from './../../shared/auth/csrf.service';
import { AuthServerProvider } from './../../shared/auth/auth-jwt.service';
import { Injectable } from '@angular/core';
import { Principal } from '../../shared';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { friendRequestReason, FriendshipRequst } from './friend-request-model';
import { SERVER_API_URL } from '../../app.constants';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import SockJS = require('sockjs-client');
import Stomp = require('webstomp-client');
import { WindowRef } from '../../shared/tracker/window.service';
@Injectable()
export class FriendshipService {
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listener: Observable<any>;
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private authServerProvider: AuthServerProvider,
    private $window: WindowRef,
    private csrfService: CSRFService,
    private principalService: Principal
  ) {
    this.connection = this.createConnection();
    this.listener = this.createListener();
    this.connect();
  }

  connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    // building absolute path so that websocket doesnt fail when deploying with a context path
    const loc = this.$window.nativeWindow.location;
    let url = '//' + loc.host + loc.pathname + 'websocket/addFriend';
    const authToken = this.authServerProvider.getToken();
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers = {};
    this.stompClient.connect(headers, () => {
      this.connectedPromise('success');
      this.connectedPromise = null;
      this.subscribe();
      if (!this.alreadyConnectedOnce) {
        this.alreadyConnectedOnce = true;
      }
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.alreadyConnectedOnce = false;
  }

  receive() {
    return this.listener;
  }

  sendFriendRequest(userLogin: string, userID: number, requetReason: friendRequestReason) {
    console.log("send1");
    const selfLogin = this.principalService.getUserLogin();
    const selfID = this.principalService.getUserID();
    if (!selfLogin || selfID < 0)
      throw Error('Please login');
    const reqBody = this.createRqustObject(selfID, selfLogin, selfID, selfLogin, userID, userLogin, requetReason);

    if (this.stompClient !== null && this.stompClient.connected) {
      console.log("send3");
      this.stompClient.send(
        '/addFriend/req', // destination
        JSON.stringify(reqBody), // body
        {} // header
      );
    }
  }

  subscribe() {
    this.connection.then(() => {
      this.subscriber = this.stompClient.subscribe('/addFriend/' + this.principalService.getUserLogin(), (data) => {
        console.log("finished to subscribe");
        this.listenerObserver.next(JSON.parse(data.body));
      });
    });
  }

  unsubscribe() {
    if (this.subscriber !== null) {
      this.subscriber.unsubscribe();
    }
    this.listener = this.createListener();
  }

  private createListener(): Observable<any> {
    return new Observable((observer) => {
      this.listenerObserver = observer;
    });
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => this.connectedPromise = resolve);
  }

  // /**userLogin: login of the user that you want to add
  //  * userID:  id of the user that you want to add
  //  */
  // sendFriendRequest(userLogin: string, userID: number, requetReason: friendRequestReason): Observable<Boolean> {
  //   const selfLogin = this.principalService.getUserLogin();
  //   const selfID = this.principalService.getUserID();
  //   if (!selfLogin || selfID < 0)
  //     throw Error('Please login');
  //   const reqBody = this.createRqustObject(selfID, selfLogin, selfID, selfLogin, userID, userLogin, requetReason);
  //   console.log(reqBody);
  //   return this.http.post<FriendshipRequst>(this.resourceUrl, reqBody, { observe: 'response'}).map((response) => {
  //     if (response.ok)
  //       return true;
  //     return false;
  //   });
  // }

  private createRqustObject(
    introByID: number,
    introByLogin: string,
    introToID: number,
    introToLogin: string,
    introUserID: number,
    introUserLogin: string,
    requestReason: friendRequestReason
  ): FriendshipRequst {
    return {
      time: new Date(),
      reason: requestReason,
      introduceByLogin: introByLogin,
      introduceById: introByID,
      introduceToLogin: introToLogin,
      introduceToId: introToID,
      introduceUserIDLogin: introUserLogin,
      introduceUserIDId: introUserID,
    };
  }

}
