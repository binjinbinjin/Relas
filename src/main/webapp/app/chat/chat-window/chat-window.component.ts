
import {mergeMap} from 'rxjs/operators';

import { dispatch, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { StoreDataInter, StoreDataStatus } from '../../app-store/app-store/app.store.model';
import { CHAT_THREADS } from '../../app-store/chat/chat.data';
import { ChatMessage } from '../model/chat-message.model';
import { ChatRoomDataModel } from '../model/chat-room.model';
import { ChatAction, ChatActionEnum } from './../../app-store/chat/chat.action';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['chat-window.component.css']
})
/**This is a component for chatting
 *  - this component will display the messages
 *  - this component can compose and send new message
 */
export class ChatWindowComponent implements OnInit, OnDestroy {

  /**Emmiter use to emmit when windows close*/
  @Output('close') close: EventEmitter<boolean>;

  /**chatId for the chat thread to dispaly */
  @Input('chatId') chatId: number;

  /**Get the chat threads from app store */
  @select([CHAT_THREADS])
  chatThreads: Observable<StoreDataInter<ChatRoomDataModel>>;

  /**Current login user's login, design to get this value from route*/
  userLogin: string;

  /**Reference of subscription */
  subscription: Subscription;

  /**Messages to dispaly */
  message: ChatMessage[];

  /**To recored the windows is close or not */
  open: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.open = true;
    this.close = new EventEmitter();
    this.message = [];
    this.chatId = 0;
    this.userLogin = '';
  }

  /**Close the chat windows */
  click() {
   this.close.emit(true);
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.pipe(mergeMap((parm) => {
      if (parm.chatId) {
        this.chatId = +parm.chatId; // get the chat id from route query
        this.userLogin = parm.userName;
        this.removeUnreadMessages();
      }
      return this.chatThreads;
    })).subscribe((chat) => {
      if (this.chatId > 0 ) {
        this.message = chat.payloads.find((each) => each.chatId === this.chatId).messages;
      }
    });
  }

  @dispatch()
  /**
   * Send a new message
   * - message will be send through the app store
   */
  newMessage(message): ChatAction {
    console.log(message);
    const chatMessage = new ChatMessage();
    chatMessage.message = message;
    chatMessage.id = this.chatId;
    return {
      type: ChatActionEnum.SEND_NEW_MESSAGE,
      payLoad: chatMessage,
      chatId: this.chatId,
      dataInfo: {dataStatus: StoreDataStatus.SENT}
    };
  }

  closeChat() {
    this.open = !this.open;
    this.router.navigate(['chat/threads', this.userLogin]);
  }

  ngOnDestroy() {
    this.removeUnreadMessages();
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  @dispatch()
  /**Make all message in current chat room as read */
  removeUnreadMessages(): ChatAction {
    return {
      type: ChatActionEnum.REMOVE_UNREAD_MESSAGE,
      chatId: this.chatId,
      stateName: CHAT_THREADS,
      dataInfo: {dataStatus: StoreDataStatus.COMPLETE}
    };
  }

}
