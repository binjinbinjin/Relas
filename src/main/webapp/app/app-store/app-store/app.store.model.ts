import { INITIAL_ADD_FRIEND, INITIAL_RECEIVED_REQUEST } from '../friend-control/friend-control.data';
import { FriendshipRequest } from './../../friend-control/friend-control-services/friend-request-model';

/**Describe where is the data come from */
export const enum StoreDataSource {
    'WEB_SOCKET' = 0, /**Data is from web socket */
    'HTTP' = 1, /**Data is from HTTP request */
    'CLIENT' = 2, /**Data is compose by user (user input, user action etc ...) */
    'LOCAL_STORAGE' = 3, /**Data is from local storage */
    'SESSION_STORAGE' = 4 /**Data is from session storage */
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
    dataStatus: StoreDataStatus; /**data status */
    extraInfo?: any; /**Extra information about the data */
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
    [data: string]: StoreDataInter<FriendshipRequest>;
    route?: any;
}

/**Initial state */
export const INITIAL_APP_STORE: AppStoreState = {
    addFriend: INITIAL_ADD_FRIEND(),
    receivedRequest: INITIAL_RECEIVED_REQUEST(),
};
