import { Component, Input, OnInit } from '@angular/core';

import { FriendListModel } from '../../friend-control-model/friend-list.model';

/**This component is use to dispaly each user of friend list */
@Component({
  selector: 'app-friendblock',
  templateUrl: './friendblock.component.html',
  styleUrls: ['./friendblock.component.css']
})
export class FriendblockComponent implements OnInit {

  /**User to display */
  @Input('user') user: FriendListModel;
  constructor() {
    this.user = new FriendListModel();
  }

  ngOnInit() {
  }

}
