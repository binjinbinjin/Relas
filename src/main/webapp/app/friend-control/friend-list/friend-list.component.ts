import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FriendListModel } from '../friend-control-model/friend-list.model';
import { StoreDataInter } from '../../app-store/app-store/app.store.model';
import { select$, select } from '@angular-redux/store';
import { GET_FRIEND_LIST } from '../../app-store/friend-list/friend-list.data';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styles: []
})
export class FriendListComponent implements OnInit {

  @select([GET_FRIEND_LIST])
  getFriendList: Observable<StoreDataInter<FriendListModel>>;

  req;
  constructor() { }

  ngOnInit() {
    this.req = {num: 1};
    this.getFriendList.subscribe((response) => {
      this.req = response;
    });
  }

}
