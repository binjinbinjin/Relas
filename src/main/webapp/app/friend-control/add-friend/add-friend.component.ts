import { dispatch } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { StoreDataStatus } from '../../app-store/app-store/app.store.model';
import {
  createSendRequstAction,
  FriendControlActionRequestAction,
  FriendControlActionsList,
} from '../../app-store/friend-control/friend-control.action';
import { defaultFriendShipRequestObject, friendRequestReason } from '../friend-control-services/friend-request-model';
import { UserIDAndLogin } from './../../shared/userID-userLogin-model';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // this.friendshipService.subscribe();
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

  /**Send the request to store*/
  @dispatch()
  sendRequest(reason: friendRequestReason): FriendControlActionRequestAction {
    const request = defaultFriendShipRequestObject();
    request.introduceUserIDId = this.req.id;
    request.introduceUserIDLogin = this.req.login;
    request.reason = reason;
    const action = createSendRequstAction(FriendControlActionsList.ADD_FRIEND, { dataStatus: StoreDataStatus.SENT }, request);
    return action;

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
