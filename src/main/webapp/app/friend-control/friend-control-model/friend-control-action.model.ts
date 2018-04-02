
export const  enum FriendControlActionEnum {
    ADD_FRIEND = 'ADD_FRIEND',
    DELETE_FRIEND = 'DELETE_FRIEND',
    NEW_FRIEND = 'NEW_FRIEND',
    GET_LIST = 'GET_LIST',
    NEW_FRIEND_LIST = 'NEW_FRIEND_LIST',
}

export class FriendControlActionModel {
    userLogin?: string;
    targetLogin: string;
    action: FriendControlActionEnum;
    reason?: string;
    constructor(action: FriendControlActionEnum, targetLogin: string, reason?: string, userLogin?: string) {
        this.action = action;
        this.targetLogin = targetLogin;
        if (userLogin)
            this.userLogin = userLogin;

        if (this.reason)
            this.reason = reason;
    }
}
