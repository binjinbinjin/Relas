import { ActionCreator } from 'redux';

import { AppAction } from '../app-store/app.action.model';
import { FriendshipRequest } from './../../friend-control/friend-control-services/friend-request-model';
import { StoreDataInfo } from './../app-store/app.store.model';

/**A list of actions that can perform for the friend control */
export const enum FriendControlActionsList {
    'ADD_FRIEND' = 0, /**Send a friend request to service */
    'INTRODUCE_FRIEND' = 1, /***Send a introduce friend request to service */
    'RECEIVED_REQUEST' = 2, /**Keep to get the request form service */
    'NEW_REQUEST' = 3 /**A new request have been received from the serviece */
}

/**Interface for the all the action of friend-control.
 * Use to enforce the type of action must be one of the action that in FriendControlActionsList
 */
export interface FriendControlActionBasic extends AppAction {
    type: FriendControlActionsList;
}

/**Action infterface for sending a request( add friend, or introduce a friend to other) */
export interface FriendControlActionRequestAction extends FriendControlActionBasic {
    request?: FriendshipRequest;
}

/**Utility for create a FriendControlActionRequestAction action */
export const createSendRequstAction: ActionCreator<FriendControlActionRequestAction> =
    (reqType: FriendControlActionsList, dataInformation: StoreDataInfo, requestObj?: FriendshipRequest) => ({
        type: reqType,
        request: requestObj,
        dataInfo: dataInformation
});
