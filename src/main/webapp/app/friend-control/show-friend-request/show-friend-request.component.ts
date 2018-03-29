import { select, select$ } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FriendshipRequest } from '../friend-control-services/friend-request-model';
import { RECEIVED_REQUEST } from './../../app-store/friend-control/friend-control.data';
import { StoreDataInter } from '../../app-store/app-store/app.store.model';

export const getRequst = (payloads$: Observable<{}>) => {
  return payloads$.map((value) => {
    const state = (value as StoreDataInter<FriendshipRequest>);
    const payloads = state.payloads;
    return payloads.filter((item) => item.introduceToId === item.introduceById);
  });
};
@Component({
  selector: 'app-show-friend-request',
  templateUrl: './show-friend-request.component.html',
  styles: []
})
export class ShowFriendRequestComponent implements OnInit {

  /**Get the requests from store */
  @select$([RECEIVED_REQUEST], getRequst)
  readonly payloads: Observable<FriendshipRequest[]>;
  req: any;
  constructor() { }

  ngOnInit() {
    this.req = { };
    this.payloads.subscribe((response) => {
      this.req = response;
    });
  }

}
