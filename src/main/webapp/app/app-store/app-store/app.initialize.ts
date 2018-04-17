import { dispatch } from '@angular-redux/store';

import { FriendControlActionEnum } from '../../friend-control/friend-control-model/friend-control-action.model';
import { ChatAction, ChatActionEnum } from '../chat/chat.action';
import { CHAT_MESSAGES, CHAT_THREADS } from '../chat/chat.data';
import { createSendRequstAction, FriendControlActionsList } from '../friend-control/friend-control.action';
import { createGetFriendlistAction } from '../friend-list/friend-list.action';
import { StoreDataStatus } from './app.store.model';

/**This class is use to initilize all the stuff that have to be initialize for the store */
export class AppStoreInitializer {

    static initialize(): void {
        AppStoreInitializer.friendControlReceiveRequest();
        AppStoreInitializer.friendList();
        AppStoreInitializer.initialChatRooms();
        AppStoreInitializer.newChatRoom();
        AppStoreInitializer.newMessage();
        AppStoreInitializer.newChatRoomMember();
        AppStoreInitializer.newChatRoomAndMember();
    }

    /**
     * dispatch an action to start to get the request from
     */
    @dispatch()
    private static friendControlReceiveRequest() {
        return createSendRequstAction(
            FriendControlActionsList.RECEIVED_REQUEST,
            {dataStatus: StoreDataStatus.INITIALIZE}
        );
    }

    /**
     * dispatch an action to get friend list
     */
    @dispatch()
    private static friendList() {
        return createGetFriendlistAction(
            FriendControlActionEnum.GET_LIST,
            { dataStatus: StoreDataStatus.INITIALIZE }
        );
    }

    /**
     * Get all exist chat room for current login user
     */
    @dispatch()
    private static initialChatRooms(): ChatAction {
        return {
            type: ChatActionEnum.INITIAL_GET_ALL_CHAT_ROOM_FROM_SERVICE,
            stateName: CHAT_THREADS,
            dataInfo: { dataStatus: StoreDataStatus.INITIALIZE }
        };
    }

    /**
     * Subscribe for the new chat message
     */
    @dispatch()
    private static newMessage(): ChatAction {
        return {
            type: ChatActionEnum.SUBSCRIBE_UNREAD_MESSAGE_FROM_SERVICE,
            stateName: CHAT_MESSAGES,
            dataInfo: { dataStatus: StoreDataStatus.INITIALIZE }
        };
    }

    /**
     * Subscribe for been add to a new chat room by some other user
     */
    @dispatch()
    private static newChatRoom(): ChatAction {
        return {
            type: ChatActionEnum.BEEN_ADD_TO_A_CAHT_ROOM,
            stateName: CHAT_THREADS,
            dataInfo: { dataStatus: StoreDataStatus.INITIALIZE }
        };
    }

    /**
     * Subscribe for adding new member to exist chat room
     */
    @dispatch()
    private static newChatRoomMember(): ChatAction {
        return {
            type: ChatActionEnum.SUBSCRIBE_GET_NEW_CHAT_MEMBER,
            stateName: CHAT_THREADS,
            dataInfo: { dataStatus: StoreDataStatus.INITIALIZE }
        };
    }

    /**
     * Subscribe for result of created new chat room
     */
    @dispatch()
    private static newChatRoomAndMember(): ChatAction {
        return {
            type: ChatActionEnum.SUBSCRIBE_NEW_CHAT_ROOM_WITH_MEMBERS,
            stateName: CHAT_THREADS,
            dataInfo: { dataStatus: StoreDataStatus.INITIALIZE }
        };
    }

}
