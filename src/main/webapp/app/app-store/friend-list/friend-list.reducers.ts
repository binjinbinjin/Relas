import { AppStoreState, INITIAL_APP_STORE } from './../app-store/app.store.model';
import { FriendshipControlService } from './../service/friendshipControl.service';
import { StoreDataInter, StoreDataStatus } from '../app-store/app.store.model';
import { FriendListModel } from '../../friend-control/friend-control-model/friend-list.model';
import { FriendListActionGet, FriendListActionSend } from './friend-list.action';
import { INITIAL_GET_FRIEND_LIST } from './friend-list.data';
import { FriendControlActionEnum } from '../../friend-control/friend-control-model/friend-control-action.model';

/**A reducer for get friend list */
export function getFriendListReducer() {
    return (state: StoreDataInter<FriendListModel> = INITIAL_GET_FRIEND_LIST(), action: FriendListActionGet) => {
        // if action is not about geting friend list then return
        if (action.type !== FriendControlActionEnum.GET_LIST &&
            action.type !== FriendControlActionEnum.NEW_FRIEND &&
            action.type !== FriendControlActionEnum.NEW_FRIEND_LIST)
            return state;
        // if the action.dataInfo.dataStatus !== StoreDataStatus.COMPLETE
        // that means the data is either not ready or some error have been occured
        // so just record the data status, then return
        if (action.dataInfo.dataStatus !== StoreDataStatus.COMPLETE) {
            const dataInfomation = { dataStatus: action.dataInfo.dataStatus};
            return {
                ...state,
                dataInfo: dataInfomation
            };
        }
        switch (action.type) {
            // get a list of friend to add into friendlist
            case FriendControlActionEnum.NEW_FRIEND_LIST : {
                const newPayloads: FriendListModel[] = [];
                (action.list as FriendListModel[]).forEach((element) => {
                    const el: FriendListModel = new FriendListModel(
                                                        element.id,
                                                        element.userRelationship,
                                                        element.remark,
                                                        element.userIDLogin,
                                                        element.userIDId,
                                                        element.friendIDLogin,
                                                        element.friendIDId);
                    newPayloads.push(el);
                });

                return {
                    ...state,
                    payloads: newPayloads,
                    dataInfo: {dataStatus: StoreDataStatus.COMPLETE}
                };

            }
        // get a friend to add into friendlist
            case FriendControlActionEnum.NEW_FRIEND : {
                const element = (action.list as FriendListModel);
                state.payloads.push(new FriendListModel(
                                                    element.id,
                                                    element.userRelationship,
                                                    element.remark,
                                                    element.userIDLogin,
                                                    element.userIDId,
                                                    element.friendIDLogin,
                                                    element.friendIDId));
                return {
                    ...state,
                    dataInfo: {dataStatus: StoreDataStatus.COMPLETE}
                };
            }
        }
        return state;
    };
}

/**
 * Reducer for add or remove user into friend list
 * @param friendshipControlService a service to tells the service to add/remove the user into friend list
 */
export function sendFriendListActionReducer(friendshipControlService: FriendshipControlService) {
    return (state: AppStoreState = INITIAL_APP_STORE, action: FriendListActionSend) => {
        // if new action is not about add/remove friend then return
        if (action.type !== FriendControlActionEnum.ADD_FRIEND && action.type !== FriendControlActionEnum.DELETE_FRIEND)
            return state;
        switch (action.type) {
            // add friend
            case FriendControlActionEnum.ADD_FRIEND : {
                friendshipControlService.addFriend(action.actionObj);
                break;
            }
            // remove friend
            case FriendControlActionEnum.DELETE_FRIEND : {
                friendshipControlService.deleteFriend(action.actionObj);
                break;
            }
        }
        // for some unknown case just return old state
        return state;
    };
}
