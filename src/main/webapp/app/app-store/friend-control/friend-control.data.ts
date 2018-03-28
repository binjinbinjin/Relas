import { StoreDataInter, StoreDataSource, StoreDataStatus } from '../app-store/app.store.model';
import {
        defaultFriendShipRequestObject,
        FriendshipRequest,
} from './../../friend-control/friend-control-services/friend-request-model';

/**Name of the data that stored in the app store */
// add friend
export const ADD_FRIEND = 'addFriend';
// introduce a friend to other
export const INTRO_FRIEND = 'introFriend';
// the requests from the service
export const RECEIVED_REQUEST = 'receivedRequest';
/***********************************************/

/****The initial data that can stored in the app store****************************************/
// add friend
export const INITIAL_ADD_FRIEND =  (): StoreDataInter<FriendshipRequest> => ({
        dataSource: StoreDataSource.CLIENT,
        dataInfo: { dataStatus: StoreDataStatus.EMPTY},
        payload: null
});

// introduce a friend
export const INITIAL_INTRO_FRIEND = (): StoreDataInter<FriendshipRequest> => ({
        dataSource: StoreDataSource.CLIENT,
        dataInfo: { dataStatus: StoreDataStatus.EMPTY },
        payload: null
});

// requsts from the service
export const INITIAL_RECEIVED_REQUEST = (): StoreDataInter<FriendshipRequest> => ({
    dataSource: StoreDataSource.CLIENT,
    dataInfo: { dataStatus: StoreDataStatus.EMPTY },
    payloads: [defaultFriendShipRequestObject()]
});
/*******************************************************************************************/
