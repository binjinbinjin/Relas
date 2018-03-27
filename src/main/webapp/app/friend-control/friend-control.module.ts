import { RelasSharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RelasSharedCommonModule } from './../shared/shared-common.module';
import { Principal } from 'src/main/webapp/app/shared/auth/principal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { UserPortfolioModule } from '../user-portfolio/user-portfolio.module';
import { FriendshipService } from './friend-control-services/friendship.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowFriendRequestComponent } from './show-friend-request/show-friend-request.component';

@NgModule({
  imports: [
    CommonModule,
    UserPortfolioModule,
    FormsModule,
    RelasSharedCommonModule,
    NgbModule,
    RelasSharedModule
  ],
  exports: [AddFriendComponent, ShowFriendRequestComponent],
  providers: [FriendshipService],
  declarations: [AddFriendComponent, ShowFriendRequestComponent]
})
export class FriendControlModule { }
