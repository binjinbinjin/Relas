import { FriendListModel } from './../../friend-control/friend-control-model/friend-list.model';
import { StoreDataInter, StoreDataStatus, StoreDataSource } from '../app-store/app.store.model';

////////////////////////////////////////////////////////////////////////////////////////////////

/**Name of the data that stored in the app store
 * friend list
 */
export const GET_FRIEND_LIST = 'getFriendList';

////////////////////////////////////////////////////////////////////////////////////////////////

///// The initial data that can stored in the app store///////////////////////////////////////

/**
 * The initial data that can stored in the app store
 * friend list
 *
 */
export const INITIAL_GET_FRIEND_LIST = (): StoreDataInter<FriendListModel> => ({
        payloads: [],
        dataInfo: { dataStatus: StoreDataStatus.EMPTY},
        dataSource: StoreDataSource.WEB_SOCKET
});

////////////////////////////////////////////////////////////////////////////////////////////////
