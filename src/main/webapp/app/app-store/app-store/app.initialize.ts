import { dispatch } from '@angular-redux/store';

import { createSendRequstAction, FriendControlActionsList } from '../friend-control/friend-control.action';
import { FriendshipRequestService } from '../service/friendshipRequest.service';
import { StoreDataStatus } from './app.store.model';
import { FriendshipControlService } from '../service/friendshipControl.service';
import { FriendControlActionEnum } from '../../friend-control/friend-control-model/friend-control-action.model';
import { createGetFriendlistAction } from '../friend-list/friend-list.action';

/**This class is use to initilize all the stuff that have to be initialize for the store */
export class AppStoreInitializer {

    static initialize(friendshipService: FriendshipRequestService, friendshipControlService: FriendshipControlService): void {
        AppStoreInitializer.friendControlReceiveRequest();
        AppStoreInitializer.friendList();
    }

    /**
     * dispatch an action to start to get the request from
     */
    @dispatch()
    private static friendControlReceiveRequest() {
        return createSendRequstAction(FriendControlActionsList.RECEIVED_REQUEST, {dataStatus: StoreDataStatus.INITIALIZE});
    }

    /**
     * dispatch an action to get friend list
     */
    @dispatch()
    private static friendList() {
        return createGetFriendlistAction(FriendControlActionEnum.GET_LIST, { dataStatus: StoreDataStatus.INITIALIZE });
    }

}
