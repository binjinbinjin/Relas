import { select$ } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { StoreDataInter } from '../../app-store/app-store/app.store.model';
import { FriendshipControlService } from '../../app-store/service/friendshipControl.service';
import { FriendshipRequest } from '../friend-control-model/friend-request-model';
import { RECEIVED_REQUEST } from './../../app-store/friend-control/friend-control.data';
import { PortfolioSearchOption } from '../../user-portfolio/portfolio-search/search-util';
import { FriendControlActionModel, FriendControlActionEnum } from '../friend-control-model/friend-control-action.model';

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

  /**An array of user requests */
  req: any;

  /**Record of a PortfolioSearchOption of a request sender, and request id*/
  requestUser;

  /**Reference of open modal */
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private friendshipControlService: FriendshipControlService) { }

  ngOnInit() {
    this.req = { };
    this.payloads.subscribe((response) => {
      this.req = response;
    });
  }

  /**Show the userPorfolio of a request sender by login */
  showPortfolio(login: string, id: number, content) {
    this.requestUser = {
      search: ({useLogin: true, value: login} as PortfolioSearchOption),
      requestId: id
    };
    this.modalRef = this.modalService.open(content);
  }

  closeModal(add) {
    this.modalRef.close();
    if (!add) {
        this.requestUser = null;
        return;
    }
    this.addFriend(add.search.value);
  }

  addFriend(targetLogin: string) {
    this.friendshipControlService.addFriend(new FriendControlActionModel(FriendControlActionEnum.ADD_FRIEND, targetLogin));
  }
}
