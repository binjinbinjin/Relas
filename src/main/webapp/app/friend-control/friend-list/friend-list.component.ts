import { UserPortfolioService } from './../../user-portfolio/user-portfolio-service/user-portfolio.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FriendListModel } from '../friend-control-model/friend-list.model';
import { StoreDataInter } from '../../app-store/app-store/app.store.model';
import { select$, select } from '@angular-redux/store';
import { GET_FRIEND_LIST } from '../../app-store/friend-list/friend-list.data';

/**This component is use to dispaly the a list of friend */
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  /**Get the friend list form store */
  @select([GET_FRIEND_LIST])
  getFriendList: Observable<StoreDataInter<FriendListModel>>;

  /**True iff the friend list is display */
  displayList: boolean;

  /**A list that record the friend list */
  req: FriendListModel[];
  constructor(private userPortfolioService: UserPortfolioService) {
    this.req = [];
    this.displayList = true;
   }

  ngOnInit() {
    // subscribe the data change from store
    this.getFriendList.subscribe((response) => {
      this.req = response.payloads;
      this.loadFriendInfo();
    });
  }

  /**Load the user data of friendlist from service */
  loadFriendInfo() {
    this.req.forEach((item) => {
      if (item.friendInfoCheck())
         return;
      this.userPortfolioService
      .fetchPortfolioByLogin(item.friendIDLogin)
      .toPromise()
      .then((response) => {
        item.setFriendDescription(response.body.description);
        item.setfriendImage(response.body.image);
        item.setFriendImageContentType(response.body.imageContentType);
        item.setFriendDisplayName(response.body.displayName);
      });
    });
  }

}
