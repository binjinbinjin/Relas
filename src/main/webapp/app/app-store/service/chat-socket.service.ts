import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import SockJS = require('sockjs-client');
import Stomp = require('webstomp-client');

import { AddChatMemberModel } from '../../chat/model/add-chat-member.model';
import { ChatRoomModel } from '../../chat/model/chat-room.model';
import { Principal } from '../../shared';
import { AuthServerProvider } from '../../shared/auth/auth-jwt.service';
import { CSRFService } from '../../shared/auth/csrf.service';
import { WindowRef } from '../../shared/tracker/window.service';
import { CreateNewRoomAndAddChatMemberModel } from './../../chat/model/add-chat-member.model';
import { ChatMessage, convertChatMessageToChatMessageModel } from './../../chat/model/chat-message.model';

@Injectable()
/**Socket for chatting
 * - HTTP WEB SOCKET SERVICE
 */
export class ChatSocketService {
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  /**Listener for new message*/
  newMessageListener: Observable<any>;
  /**Listener for new chat members (list of members)*/
  newChatMemberListener: Observable<any>;
  /**Listener for new chat room*/
  newChatRoomListener: Observable<any>;
  /**Listener for new chat room with members*/
  newChatRoomWithMembersListener: Observable<any>;
  newMessageListenerObserver: Observer<any>;
  newChatMemberListenerObserver: Observer<any>;
  newChatRoomListenerObserver: Observer<any>;
  newChatRoomWithMembersListenerObserver: Observer<any>;
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
    this.newMessageListener = this.createNewMessageListener();
    this.newChatMemberListener = this.createNewMemberListener();
    this.newChatRoomListener = this.createNewChatRoomListener();
    this.newChatRoomWithMembersListener = this.createNewChatRoomWithMembersListener();
    this.connect(); // connect to the service
  }

  /**Connect to service */
  private  connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    // building absolute path so that websocket doesnt fail when deploying with a context path
    const loc = this.$window.nativeWindow.location;
    let url = '//' + loc.host + loc.pathname + 'websocket/chat';
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

  private disconnect() {
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

  /**Listener for new message */
  receiveNewMessage() {
    return this.newMessageListener;
  }

  /**Listener for a new members (List of members) */
  receiveNewChatRoomMember() {
    return this.newChatMemberListener;
  }

  /**Listener for new chat room */
  receiveNewChatRoom() {
    return this.newChatRoomListener;
  }

  /**Listener for new chat room and members */
  receiveNewChatRoomAndMembers() {
    return this.newChatRoomWithMembersListener;
  }

  /**
   * Create a new 2 person chat room
   * - This method will automaticlly add the current login user to the AddChatMemberModel
   * - members.addMembers should only contain the login of user that you wants to chat with
   * @param members an AddChatMemberModel object
   */
  newTwoPersonChatRoomAndMember(members: AddChatMemberModel) {
    const chatRoom  = this.twoPersonChatRoom();
    members.addMembers.push(this.userId);
    const dto = new CreateNewRoomAndAddChatMemberModel();
    dto.room = chatRoom;
    dto.newMembers = members;
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/room/members', // destination
        JSON.stringify(dto), // body
        {} // header
      );
    }
  }

  /**
   * Send a new message
   * @param message a ChatMessage object
   * @param chatId chat room id
   */
  newMessage(message: ChatMessage, chatId: number) {
    message.senderLogin = this.userLogin;
    const messageModel = convertChatMessageToChatMessageModel(message, chatId);
    messageModel.time = new Date();
    messageModel.messageSenderId = this.userId;
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/new/message', // destination
        JSON.stringify(messageModel), // body
        {} // header
      );
    }
  }

  /**Add new member to exist chat room */
  addMemberToChat(model: AddChatMemberModel) {
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/add/member', // destination
        JSON.stringify(model), // body
        {} // header
      );
    }
  }

  private subscribe() {
    this.connection.then(() => {
      this.subscriber = this.stompClient.subscribe('/chat/' + this.principalService.getUserLogin(), (data) => {

        const received = JSON.parse(data.body);
       // non array
        if (received.message && received.chatIDId && received.messageSenderId && received.messageSenderLogin) // ChatMessageModel
          this.newMessageListenerObserver.next(received);
        else if (received.chatID && received.id && received.maxMember) // ChatRoomModel
          this.newChatRoomListenerObserver.next(received);
        else if (received.room && received.roomMembers) // CreateNewRoomAndAddChatMemberModel
          this.newChatRoomWithMembersListenerObserver.next(received);
        // array
        if (Array.isArray(received) && received.length) {
          if (received[0].chatIDId && received[0].memberIDLogin) // ChatRoomMemberModel[]
                    this.newChatMemberListenerObserver.next(received);
        }

      });
    });
  }

  private unsubscribe() {
    if (this.subscriber !== null) {
      this.subscriber.unsubscribe();
    }
    this.newMessageListener = this.createNewMessageListener();
    this.newChatMemberListener = this.createNewMemberListener();
    this.newChatRoomListener = this.createNewChatRoomListener();
    this.newChatRoomWithMembersListener = this.createNewChatRoomWithMembersListener();
  }

  private createNewMessageListener(): Observable<any> {
    return new Observable((observer) => {
      this.newMessageListenerObserver = observer;
    });
  }

  private createNewMemberListener(): Observable<any> {
    return new Observable((observer) => {
      this.newChatMemberListenerObserver = observer;
    });
  }

  private createNewChatRoomListener(): Observable<any> {
    return new Observable((observer) => {
      this.newChatRoomListenerObserver = observer;
    });
  }

  private createNewChatRoomWithMembersListener(): Observable<any> {
    return new Observable((observer) => {
      this.newChatRoomWithMembersListenerObserver = observer;
    });
  }
  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => this.connectedPromise = resolve);
  }

  private twoPersonChatRoom(): ChatRoomModel {
    const chat = new ChatRoomModel();
    chat.maxMember = 2;
    return chat;
  }

  get userId() {
    return this.principalService.getUserID();
  }

  get userLogin() {
    return this.principalService.getUserLogin();
  }

}
