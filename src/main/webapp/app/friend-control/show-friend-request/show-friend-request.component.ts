import { Component, OnInit } from '@angular/core';
import { FriendshipRequst } from '../friend-control-services/friend-request-model';
import { FriendshipService } from '../friend-control-services/friendship.service';

@Component({
  selector: 'app-show-friend-request',
  templateUrl: './show-friend-request.component.html',
  styles: []
})
export class ShowFriendRequestComponent implements OnInit {

  req: any;
  constructor(private friendshipService: FriendshipService) { }

  ngOnInit() {
    this.req = {num: 1};
    // this.friendshipService.subscribe();
    this.friendshipService.receive().subscribe((response) => {
      this.req = response;
    });
  }

}
