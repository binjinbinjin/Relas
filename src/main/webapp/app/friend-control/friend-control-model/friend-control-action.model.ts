
export const  enum FriendControlActionEnum {
    ADD_FRIEND = 'ADD_FRIEND',
    DELETE_FRIEND = 'DELETE_FRIEND'
}

export class FriendControlActionModel {
    userLogin?: string;
    targetLogin: string;
    action: FriendControlActionEnum;
    constructor(action: FriendControlActionEnum, targetLogin: string, userLogin?: string) {
        this.action = action;
        this.targetLogin = targetLogin;
        if (userLogin)
            this.userLogin = userLogin;
    }
}
