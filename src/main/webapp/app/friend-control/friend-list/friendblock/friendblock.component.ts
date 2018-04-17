import { Component, Input, OnInit } from '@angular/core';

import { FriendListModel } from '../../friend-control-model/friend-list.model';
import { Router } from '@angular/router';
import { dispatch } from '@angular-redux/store';
import { ChatAction, ChatActionEnum } from '../../../app-store/chat/chat.action';
import { StoreDataStatus } from '../../../app-store/app-store/app.store.model';
import { CHAT_THREADS } from '../../../app-store/chat/chat.data';

/**This component is use to dispaly each user of friend list */
@Component({
  selector: 'app-friendblock',
  templateUrl: './friendblock.component.html',
  styleUrls: ['./friendblock.component.css']
})
export class FriendblockComponent implements OnInit {

  /**User to display */
  @Input('user') user: FriendListModel;

  constructor(private router: Router) {
    this.user = new FriendListModel();
  }

  ngOnInit() {
  }

  /**Click the user */
  clicked() {
    this.newChatRoom();
  }

  @dispatch()
  /**Create a chat thread and jump the chat window*/
  newChatRoom(): ChatAction {
    return {type: ChatActionEnum.NEW_CAHT_ROOM,
      payLoad: [this.user.friendIDId],
      list: this.user.friendIDLogin,
      dataInfo: { dataStatus: StoreDataStatus.COMPLETE},
      stateName: CHAT_THREADS,
      redirect: true
    };
  }
}
