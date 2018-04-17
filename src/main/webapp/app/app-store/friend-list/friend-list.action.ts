import { StoreDataInfo } from './../app-store/app.store.model';
import { FriendControlActionEnum, FriendControlActionModel } from '../../friend-control/friend-control-model/friend-control-action.model';
import { AppAction } from '../app-store/app.action.model';
import { FriendListModel } from '../../friend-control/friend-control-model/friend-list.model';
import { ActionCreator } from 'redux';
import { portfolioRoute } from '../../account/portfolio/user-portfolio.route';
import { UserPortfolio } from '../../user-portfolio/user-portfolio.model';

/**Basic action interface about friend list */
export interface FriendlistAction extends AppAction {
    type: FriendControlActionEnum;
    list?: FriendListModel[] | FriendListModel;
    actionObj?: FriendControlActionModel;
    login?: string;
    portfolio?: UserPortfolio;
}

/**A creator to create an action to get friend list */
export const createGetFriendlistAction: ActionCreator<FriendlistAction> =
(reqType: FriendControlActionEnum,
    dataInfoObj: StoreDataInfo,
    listObj?: FriendListModel[] | FriendListModel) => ({
        type: reqType,
        list: listObj,
        dataInfo: dataInfoObj
}
);
