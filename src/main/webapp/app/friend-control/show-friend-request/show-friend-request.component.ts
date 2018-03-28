import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FriendshipRequest } from '../friend-control-services/friend-request-model';
import { RECEIVED_REQUEST } from './../../app-store/friend-control/friend-control.data';

@Component({
  selector: 'app-show-friend-request',
  templateUrl: './show-friend-request.component.html',
  styles: []
})
export class ShowFriendRequestComponent implements OnInit {

  /**Get the requests from store */
  @select([RECEIVED_REQUEST, 'payloads'])
  readonly requsts: Observable<FriendshipRequest[]>;
  req: any;
  constructor() { }

  ngOnInit() {
    this.req = { };
    this.requsts.subscribe((response) => {
      this.req = response;
    });
  }

}
