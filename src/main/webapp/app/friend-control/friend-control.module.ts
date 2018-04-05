import { FriendblockComponent } from './friend-list/friendblock/friendblock.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppStoreModule } from './../app-store/app-store.module';
import { RelasSharedCommonModule } from './../shared/shared-common.module';
import { RelasSharedModule } from './../shared/shared.module';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { ShowFriendRequestComponent } from './show-friend-request/show-friend-request.component';
import { DirectivesModule } from '../directives/directives.module';
import { FriendshipControlService } from '../app-store/service/friendshipControl.service';
import { FriendListComponent } from './friend-list/friend-list.component';
import { UtilsModule } from '../utils/utils.module';
import { UserPortfolioModule } from '../user-portfolio/user-portfolio.module';
import { RouterModule } from '@angular/router';
import { friendControlMainRoute } from './friend-control.route';

@NgModule({
  imports: [
    CommonModule,
    UserPortfolioModule,
    FormsModule,
    RelasSharedCommonModule,
    NgbModule,
    RelasSharedModule,
    AppStoreModule,
    DirectivesModule,
    NgbModule,
    UtilsModule,
    RouterModule.forChild(friendControlMainRoute),
  ],
  exports: [AddFriendComponent, ShowFriendRequestComponent, FriendListComponent],
  providers: [],
  declarations: [AddFriendComponent, ShowFriendRequestComponent, FriendListComponent, FriendblockComponent]
})
export class FriendControlModule { }
