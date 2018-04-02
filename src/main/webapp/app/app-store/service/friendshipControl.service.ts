import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import SockJS = require('sockjs-client');
import Stomp = require('webstomp-client');

import { FriendControlActionModel } from '../../friend-control/friend-control-model/friend-control-action.model';
import { Principal } from '../../shared';
import { AuthServerProvider } from '../../shared/auth/auth-jwt.service';
import { CSRFService } from '../../shared/auth/csrf.service';
import { WindowRef } from '../../shared/tracker/window.service';

@Injectable()
export class FriendshipControlService {
    stompClient = null;
    subscriber = null;
    connection: Promise<any>;
    connectedPromise: any;
    listener: Observable<any>; // use to get the new request
    // use to publish the new request after arrived, then use can get through listener
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
        this.connect(); // connect to the service
    }

    /**Connect to service */
    connect() {
        if (this.connectedPromise === null) {
            this.connection = this.createConnection();
        }
        // building absolute path so that websocket doesnt fail when deploying with a context path
        const loc = this.$window.nativeWindow.location;
        let url = '//' + loc.host + loc.pathname + 'websocket/friendshipControl';
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

    /**Get the request from service */
    receive() {
        return this.listener;
    }

    /***Send the add friend action*/
    addFriend(friendsControlAction: FriendControlActionModel) {
        if (!this.userLogin)
            throw Error('Please login');
        friendsControlAction.userLogin = this.userLogin;
        if (this.stompClient != null && this.stompClient.connected) {
            this.stompClient.send('/friendshipControl/add', JSON.stringify(friendsControlAction), {});
        }
    }

    /***Send the delete friend action*/
    deleteFriend(friendsControlAction: FriendControlActionModel) {
        if (!this.userLogin)
            throw Error('Please login');
        friendsControlAction.userLogin = this.userLogin;
        if (this.stompClient != null && this.stompClient.connected) {
            this.stompClient.send('/friendshipControl/delete', JSON.stringify(friendsControlAction), {});
        }
    }

    subscribe() {
        this.connection.then(() => {
            this.subscriber = this.stompClient.subscribe('/friendshipControl/' + this.principalService.getUserLogin(), (data) => {
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

    private get userLogin() {
        return this.principalService.getUserLogin();
    }

}
