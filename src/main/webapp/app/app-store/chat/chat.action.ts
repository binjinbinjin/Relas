import { AppAction } from './../app-store/app.action.model';

/**All chat actions in app store*/
export const enum ChatActionEnum {
    /**
     * Action form new chat room
     */
    NEW_CAHT_ROOM = 'NEW_CAHT_ROOM',

    /**
     * Action for subscribe the service, to update when user have been add to new chat room
     * - Action to be catch in Epic Middleware
     */
    BEEN_ADD_TO_A_CAHT_ROOM = 'BEEN_ADD_TO_A_CAHT_ROOM',

    /**
     * Action for add to new chat room with chat room data
     * and chat room members data
     */
    NEW_CHAT_ROOM_WITH_MEMBERS = 'NEW_CHAT_ROOM_WITH_MEMBERS',

    /**
     * Action for subscribe the service, for new created chat room and chat room member
     * - Action to be catch in Epic Middleware
     */
    SUBSCRIBE_NEW_CHAT_ROOM_WITH_MEMBERS = 'NEW_CHAT_ROOM_WITH_MEMBERS',

    /**
     * Action for get all exist chat room for current login user
     * - Action to be catch in Epic Middleware
     */
    INITIAL_GET_ALL_CHAT_ROOM_FROM_SERVICE = 'INITIAL_GET_ALL_CHAT_ROOM_FROM_SERVICE',

    /**
     * Action for received new chat rooms
     */
    RECEIVED_CHAT_ROOMS = 'RECEIVED_CHAT_ROOMS',

    /**
     * Action for sending new message
     */
    SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE',

    /**
     * Action for get new chat member
     */
    GET_NEW_CHAT_MEMBER = 'GET_NEW_CHAT_MEMBER',

    /**
     * Action for add new member/s to the exist chat room
     */
    ADD_CHAT_MEMBER = 'ADD_CAHT_MEMBER',

    /**
     * Action for subscribe the service, for adding new member/s to then exist chat room
     * - Action to be catch in Epic Middleware
     */
    SUBSCRIBE_GET_NEW_CHAT_MEMBER = 'SUBSCRIBE_GET_NEW_CHAT_MEMBER',

    /**
     * Action for subscribe the service, for to get all unread message for current login user
     * - Action to be catch in Epic Middleware
     */
    SUBSCRIBE_UNREAD_MESSAGE_FROM_SERVICE = 'SUBSCRIBE_UNREAD_MESSAGE_FROM_SERVICE',

    /**
     * Action for remove an unread message
     */
    REMOVE_UNREAD_MESSAGE = 'REMOVE_UNREAD_MESSAGE',

    /**
     * Action for received new unread message
     */
    NEW_UNREAD_MESSAGE = 'NEW_UNREAD_MESSAGE',
}

/**Interface for Chat Action in app store */
export interface ChatAction extends AppAction {
    type: ChatActionEnum;
    payLoad?: any | any[];
    chatId?: number;
    messageId?: number;
    stateName?: string;
    redirect?: boolean;
    list?: any | any[];
}
