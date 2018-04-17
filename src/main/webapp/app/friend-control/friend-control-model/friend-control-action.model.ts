
/**Actions for FriendControl in app store */
export const  enum FriendControlActionEnum {
    ADD_FRIEND = 'ADD_FRIEND',
    DELETE_FRIEND = 'DELETE_FRIEND',
    NEW_FRIEND = 'NEW_FRIEND',
    GET_LIST = 'GET_LIST',
    NEW_FRIEND_LIST = 'NEW_FRIEND_LIST',
    ADD_PORFOLIO_FOR_FRIEND = 'ADD_PORFOLIO_FOR_FRIEND',
}

/**Model for modify the friend in frien list (Model for app store)*/
export class FriendControlActionModel {
    userLogin?: string;
    targetLogin: string;
    action: FriendControlActionEnum;
    reason?: string;
    constructor(
        action: FriendControlActionEnum,
        targetLogin: string,
        reason?: string,
        userLogin?: string) {

        this.action = action;
        this.targetLogin = targetLogin;
        if (userLogin)
            this.userLogin = userLogin;

        if (this.reason)
            this.reason = reason;
    }
}
