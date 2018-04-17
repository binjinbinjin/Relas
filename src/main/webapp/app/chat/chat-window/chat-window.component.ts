import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { dispatch, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

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
export class ChatWindowComponent implements OnInit {

  /**Emmiter use to emmit when windows close*/
  @Output('close') close: EventEmitter<boolean>;

  /**chatId for the chat thread to dispaly */
  @Input('chatId') chatId: number;

  /**Get the chat threads from app store */
  @select([CHAT_THREADS])
  chatThreads: Observable<StoreDataInter<ChatRoomDataModel>>;

  /**Messages to dispaly */
  message: ChatMessage[];

  /**To recored the windows is close or not */
  open: boolean;

  constructor(private route: ActivatedRoute) {
    this.open = true;
    this.close = new EventEmitter();
    this.message = [];
    this.chatId = 0;
  }

  /**Close the chat windows */
  click() {
   this.close.emit(true);
  }

  ngOnInit() {
    this.route.queryParams.mergeMap((parm) => {
      if (parm.chatId)
        this.chatId = +parm.chatId; // get the chat id from route query
      return this.chatThreads;
    }).subscribe((chat) => {
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

}
