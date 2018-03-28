import { EntityResponseType } from './../../entities/user-portfolio-my-suffix/user-portfolio-my-suffix.service';
import { dispatch } from '@angular-redux/store';

import { createSendRequstAction, FriendControlActionsList } from '../friend-control/friend-control.action';
import { FriendshipService } from './../friendship.service';
import { StoreDataStatus } from './app.store.model';

export class AppStoreInitializer {

    static initialize(friendshipService: FriendshipService): void {
        AppStoreInitializer.friendControlReceiveRequest();
    }

    @dispatch()
    private static friendControlReceiveRequest() {
        return createSendRequstAction(FriendControlActionsList.RECEIVED_REQUEST, {dataStatus: StoreDataStatus.INITIALIZE});
    }

}
