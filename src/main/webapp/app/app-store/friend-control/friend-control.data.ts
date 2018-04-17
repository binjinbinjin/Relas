import { StoreDataInter, StoreDataSource, StoreDataStatus } from '../app-store/app.store.model';
import { FriendshipRequest } from '../../friend-control/friend-control-model/friend-request-model';

////// Name of the data that stored in the app store ////////////////////////////////////////////

/**
 * Name of the data that stored in the app store
 * add friend
 *
 */
export const ADD_FRIEND = 'addFriend';

/**
 * Name of the data that stored in the app store
 * introduce a friend to other
 */
export const INTRO_FRIEND = 'introFriend';

/**
 * Name of the data that stored in the app store
 * the requests from the service
 */
export const RECEIVED_REQUEST = 'receivedRequest';

////////////////////////////////////////////////////////////////////////////////////////////////

///// The initial data that can stored in the app store /////////////////////////////////////////

/**
 * The initial data that can stored in the app store
 * add friend
 */
export const INITIAL_ADD_FRIEND =  (): StoreDataInter<FriendshipRequest> => ({
        dataSource: StoreDataSource.CLIENT,
        dataInfo: { dataStatus: StoreDataStatus.EMPTY},
        payload: null
});

/**
 * The initial data that can stored in the app store
 * introduce a friend
 * */
export const INITIAL_INTRO_FRIEND = (): StoreDataInter<FriendshipRequest> => ({
        dataSource: StoreDataSource.CLIENT,
        dataInfo: { dataStatus: StoreDataStatus.EMPTY },
        payload: null
});

/**
 * The initial data that can stored in the app store
 * requsts from the service
 */
export const INITIAL_RECEIVED_REQUEST = (): StoreDataInter<FriendshipRequest> => ({
    dataSource: StoreDataSource.CLIENT,
    dataInfo: { dataStatus: StoreDataStatus.EMPTY },
    payloads: []
});

////////////////////////////////////////////////////////////////////////////////////////////////
