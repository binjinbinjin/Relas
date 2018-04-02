import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserPortfolioModule } from '../user-portfolio/user-portfolio.module';
import { AppStoreModule } from './../app-store/app-store.module';
import { RelasSharedCommonModule } from './../shared/shared-common.module';
import { RelasSharedModule } from './../shared/shared.module';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { ShowFriendRequestComponent } from './show-friend-request/show-friend-request.component';
import { DirectivesModule } from '../directives/directives.module';
import { FriendshipControlService } from '../app-store/service/friendshipControl.service';
import { FriendListComponent } from './friend-list/friend-list.component';

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
    UserPortfolioModule,
    NgbModule,
  ],
  exports: [AddFriendComponent, ShowFriendRequestComponent, FriendListComponent],
  providers: [],
  declarations: [AddFriendComponent, ShowFriendRequestComponent, FriendListComponent]
})
export class FriendControlModule { }
