import { FormsModule } from '@angular/forms';
import { RelasSharedCommonModule } from './../shared/shared-common.module';
import { Principal } from 'src/main/webapp/app/shared/auth/principal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { UserPortfolioModule } from '../user-portfolio/user-portfolio.module';
import { FriendshipService } from './friend-control-services/friendship.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UserPortfolioModule,
    FormsModule,
    RelasSharedCommonModule,
    NgbModule
  ],
  exports: [AddFriendComponent],
  providers: [FriendshipService],
  declarations: [AddFriendComponent]
})
export class FriendControlModule { }
