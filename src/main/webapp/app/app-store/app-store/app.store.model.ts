import { ChatMessage } from '../../chat/model/chat-message.model';
import { ChatRoomDataModel } from '../../chat/model/chat-room.model';
import { FriendListModel } from '../../friend-control/friend-control-model/friend-list.model';
import { INITIAL_CHAT_MESSAGE, INITIAL_CHAT_THREADS } from '../chat/chat.data';
import { INITIAL_ADD_FRIEND, INITIAL_RECEIVED_REQUEST } from '../friend-control/friend-control.data';
import { INITIAL_GET_FRIEND_LIST } from '../friend-list/friend-list.data';
import { FriendshipRequest } from './../../friend-control/friend-control-model/friend-request-model';

/**Describe where is the data come from */
export const enum StoreDataSource {
    /**Data is from web socket */
    'WEB_SOCKET' = 0,
    /**Data is from HTTP request */
    'HTTP' = 1,
    /**Data is compose by user (user input, user action etc ...) */
    'CLIENT' = 2,
    /**Data is from local storage */
    'LOCAL_STORAGE' = 3,
    /**Data is from session storage */
    'SESSION_STORAGE' = 4
}

/**User to describe the status of data that stored in the stor
 */
export const enum StoreDataStatus {
    /**asymmetric data, fetching the data from http or web socket etc... */
    'LOADING' = 0,
    /**finish to update the data, data is ready to use */
    'COMPLETE' = 1,
    /**Data need to be initializ before user(data is not ready) */
    'INITIALIZE' = 2,
    /**Data is out of date */
    'DEAD' = 3,
    /**Data is does not exist*/
    'EMPTY' = 4,
    /**Data have been sent (eg. sending data back to serveice etc...) */
    'SENT' = 5,
    /**Some error occured to the data, data could be danger to use */
    'ERROR' = 6
}

/**Object that describe about the data */
export interface StoreDataInfo {
    /**data status */
    dataStatus: StoreDataStatus;
    /**Extra information about the data */
    extraInfo?: any;
}

/**The interface for the data that stored in the  store
 * All the custome state should inherit this interface
*/
export interface StoreDataInter<T> {
    payload?: T;
    payloads?: T[];
    dataInfo: StoreDataInfo;
    dataSource: StoreDataSource;
}

/**Store state interface */
export interface AppStoreState {
    [data1: string]: StoreDataInter<FriendshipRequest> |
                     StoreDataInter<FriendListModel> |
                     StoreDataInter<ChatRoomDataModel> |
                     StoreDataInter<ChatMessage>;
    route?: any;
}

/**Initial state */
export const INITIAL_APP_STORE: AppStoreState = {
    /**record of the last friend request that user have sent */
    addFriend: INITIAL_ADD_FRIEND(),
    /**record of friend request list */
    receivedRequest: INITIAL_RECEIVED_REQUEST(),
    /**record of current friend list */
    getFriendList: INITIAL_GET_FRIEND_LIST(),
    /**record for chat message, the message for each thread will
     * be store in chat thread object store in App stroe key chatThreads
     *
     * - this key is only use to store the message that have to be record, be it not currently
     * belong to any of chat thread
     * */
    chat_messages: INITIAL_CHAT_MESSAGE(),
    /**record of chat threads */
    chatThreads: INITIAL_CHAT_THREADS(),
};
