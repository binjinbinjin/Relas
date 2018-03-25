import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserIDAndLogin } from './../../shared/userID-userLogin-model';
import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../friend-control-services/friendship.service';
import { friendRequestReason } from '../friend-control-services/friend-request-model';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styles: []
})

/**This component is use for adding new friend
 *
 *This component gives the user the ability to search and
 *add new friend by click the search result
 */
export class AddFriendComponent implements OnInit {

  /**Friendship request reason */
  reason;
  /**modal reference */
  modalRef: NgbModalRef;
  /**record of the last search result that user have clicked */
  req: UserIDAndLogin;

  constructor(private friendshipService: FriendshipService, private modalService: NgbModal) { }

  ngOnInit() {
    this.reason = friendRequestReason;
  }

  /**Event handler for user search result click
  * it will save the search result that user have cliked in this.req
  * and open an confirm modal
  */
  clickUser(user: UserIDAndLogin, content) {
    this.req = user;
    this.open(content);
  }

  /**Send the request */
  sendRequest(reason: friendRequestReason) {
    this.friendshipService.sendFriendRequest(this.req.login, this.req.id, reason).toPromise().then((response) => {
    });
  }

  /**Open the add user confirm modal */
  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  /**Close the confirm modal
   * since friendship reqest reason is mandatory,
   * so when param 'reason' is null then just close the modal,
   * otherwise close modal and send the friendship request
   */
  close(reason?: friendRequestReason) {
    this.modalRef.close();
    if (reason && this.req)
      this.sendRequest(reason);

  }

}
