import { EntityResponseType } from './../../entities/user-portfolio-my-suffix/user-portfolio-my-suffix.service';
import { dispatch } from '@angular-redux/store';

import { createSendRequstAction, FriendControlActionsList } from '../friend-control/friend-control.action';
import { FriendshipService } from './../friendship.service';
import { StoreDataStatus } from './app.store.model';

/**This class is use to initilize all the stuff that have to be initialize for the store */
export class AppStoreInitializer {

    static initialize(friendshipService: FriendshipService): void {
        AppStoreInitializer.friendControlReceiveRequest();
    }

    /**
     * dispatch an action to start to get the request from
     */
    @dispatch()
    private static friendControlReceiveRequest() {
        return createSendRequstAction(FriendControlActionsList.RECEIVED_REQUEST, {dataStatus: StoreDataStatus.INITIALIZE});
    }

}
