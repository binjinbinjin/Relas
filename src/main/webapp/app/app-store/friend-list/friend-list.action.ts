import { StoreDataInfo } from './../app-store/app.store.model';
import { FriendControlActionEnum, FriendControlActionModel } from '../../friend-control/friend-control-model/friend-control-action.model';
import { AppAction } from '../app-store/app.action.model';
import { FriendListModel } from '../../friend-control/friend-control-model/friend-list.model';
import { ActionCreator } from 'redux';

/**Basic action interface about friend list */
export interface FriendlistAction extends AppAction {
    type: FriendControlActionEnum;
}

/**Action interface to get the friend list */
export interface FriendListActionGet extends FriendlistAction {
    list: FriendListModel[] | FriendListModel;
}

/***Action interface to add the friend into friend list */
export interface FriendListActionSend extends FriendlistAction {
    actionObj: FriendControlActionModel;
}

/**A creator to create an action to get friend list */
export const createGetFriendlistAction: ActionCreator<FriendListActionGet> =
(reqType: FriendControlActionEnum,
    dataInfoObj: StoreDataInfo,
    listObj?: FriendListModel[] | FriendListModel) => ({
        type: reqType,
        list: listObj,
        dataInfo: dataInfoObj
}
);
