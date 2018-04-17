import { ChatMessage } from '../../chat/model/chat-message.model';
import { ChatRoomDataModel } from '../../chat/model/chat-room.model';
import { StoreDataInter } from '../app-store/app.store.model';
import { AddChatMemberModel } from './../../chat/model/add-chat-member.model';
import { StoreDataStatus } from './../app-store/app.store.model';
import { ChatSocketService } from './../service/chat-socket.service';
import { UnreadChatMessageService } from './../service/unread-chat-message.service';
import { ChatAction, ChatActionEnum } from './chat.action';
import { INITIAL_CHAT_MESSAGE, INITIAL_CHAT_THREADS} from './chat.data';
import { Router } from '@angular/router';

export function existThreadReduder(stateName: string, chatSocket: ChatSocketService,
    router: Router) {

    return (state: StoreDataInter<ChatRoomDataModel> = INITIAL_CHAT_THREADS(), action: ChatAction): StoreDataInter<ChatRoomDataModel> => {
        let newState: StoreDataInter<ChatRoomDataModel>;

        newState = getAllExistThread(stateName, state, action);
        if (newState !== state) return newState;

        newState = newChatMember(chatSocket, stateName, state, action, router);
        if (newState !== state) return newState;

        newState = beenAddToANewChatRoomWithMembers(stateName, state, action, router);
        if (newState !== state) return newState;

        newState = addMessageToThread(stateName, state, action);
        if (newState !== state) return newState;

        newState = newChat(stateName, state, action, chatSocket, router);
        if (newState !== state) return newState;

        return state;
    };
}

/**
 * Reducer for created chat thread for user, and redirect to
 * chat windows after chat thread is create
 * @param stateName state(property) name in app store
 * @param state app state
 * @param action chat action
 * @param chatSocket chat socket service
 * @param router Router object, router for redirect
 */
export function newChat(
    stateName: string, state: StoreDataInter<ChatRoomDataModel>,
    action: ChatAction, chatSocket: ChatSocketService,
    router: Router): StoreDataInter<ChatRoomDataModel> {

    if (!action.stateName || action.stateName !== stateName)
        return state;

    if (action.type !== ChatActionEnum.NEW_CAHT_ROOM) {
        return state;
    }

    if (action.dataInfo.dataStatus !== StoreDataStatus.COMPLETE) {
        return {
            ...state,
            dataInfo: action.dataInfo
        };
    }

    switch (action.type) {
        case ChatActionEnum.NEW_CAHT_ROOM: {
            const login = chatSocket.userLogin;
            const friendlogin: string = action.list;
            for (const chat of state.payloads) {
                if (chat.maxMembers !== 2) continue;

                if ((chat.members[0].login === login && chat.members[1].login === friendlogin) ||
                (chat.members[1].login === login && chat.members[0].login === friendlogin)) {

                    router.navigate(['chat/chat-windows'], { queryParams: { chatId: chat.chatId.toString() }});
                    return state;
                }
            }
            const temp = new AddChatMemberModel();
            temp.addMembers = action.payLoad;
            chatSocket.newTwoPersonChatRoomAndMember(temp);
        }
    }
    return state;
}

/**
 * Reducer for sending new chat message
 * @param chatSocket chat socket service
 * @param unreadChatMessage unread message http service
 */
export function newMessage(
    chatSocket: ChatSocketService, unreadChatMessage: UnreadChatMessageService) {

    return (state: StoreDataInter<ChatMessage> = INITIAL_CHAT_MESSAGE(), action: ChatAction): StoreDataInter<ChatMessage> => {

        if (action.type !== ChatActionEnum.SEND_NEW_MESSAGE &&
            action.type !== ChatActionEnum.REMOVE_UNREAD_MESSAGE) {
                return state;
        }
        if (action.dataInfo.dataStatus === StoreDataStatus.ERROR || action.dataInfo.dataStatus === StoreDataStatus.LOADING)
            return { ...state, dataInfo: { ...action.dataInfo } };

        switch (action.type) {
            case ChatActionEnum.SEND_NEW_MESSAGE : {
                if (!action.payLoad || !action.chatId)
                    throw new Error('AppStore error, action.payLoad and action.chatId cannot be null when action.type = ChatActionEnum.SEND_NEW_MESSAGE ');
                chatSocket.newMessage(action.payLoad, action.chatId);
                return state;
            }

            case ChatActionEnum.REMOVE_UNREAD_MESSAGE : {
                if (!action.messageId)
                    throw new Error('AppStore error, action.messageId cannot be null when action.type = ChatActionEnum.REMOVE_UNREAD_MESSAGE');
                unreadChatMessage.removeUnreadMessage(action.messageId);
                return state;
            }
        }
        return state;
    };
}

/**
 * Reducer for get all exist thread from the service
 * @param stateName state(property) name in app store
 * @param state app state
 * @param action chat action
 */
function getAllExistThread(
    stateName: string, state: StoreDataInter<ChatRoomDataModel>,
    action: ChatAction): StoreDataInter<ChatRoomDataModel> {

    if (!action.stateName || action.stateName !== stateName)
        return state;
    if (action.type !== ChatActionEnum.INITIAL_GET_ALL_CHAT_ROOM_FROM_SERVICE && action.type !== ChatActionEnum.RECEIVED_CHAT_ROOMS)
        return state;

    if (action.dataInfo.dataStatus === StoreDataStatus.LOADING ||
        action.dataInfo.dataStatus === StoreDataStatus.INITIALIZE ||
        action.dataInfo.dataStatus === StoreDataStatus.ERROR) {
        return { ...state, dataInfo: { ...action.dataInfo } };
    }

    switch (action.type) {
        case ChatActionEnum.RECEIVED_CHAT_ROOMS: {
            const newPayloads = state.payloads.slice();
            (action.payLoad as ChatRoomDataModel[]).forEach((each) => {
                newPayloads.push(each);
            });

            return { ...state, dataInfo: { ...action.dataInfo }, payloads: newPayloads };
        }
    }
    return state;
}

/**
 * Reducer for adding new chat thread with thread members
 * @param chatSocket socket service
 * @param stateName state(property) name in app store
 * @param state app state
 * @param action chat action
 * @param router router for redirect
 */
function beenAddToANewChatRoomWithMembers(
    stateName: string, state, action,
    router: Router): StoreDataInter<ChatRoomDataModel> {

    if (action.stateName == null || stateName !== action.stateName)
        return state;
    if (action.type !== ChatActionEnum.BEEN_ADD_TO_A_CAHT_ROOM && action.type !== ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS)
        return state;

    if (action.dataInfo.dataStatus !== StoreDataStatus.COMPLETE)
        return { ...state, dataInfo: action.dataInfo };

    switch (action.type) {
        case ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS: {
            if (!action.payLoad)
                throw new Error('AppStore error, action.palyLoad cannot be null, if action.type = ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS');
            const newPlayLoads = state.payloads.slice();
            newPlayLoads.push(action.payLoad);
            if (action.redirect) router.navigate(['chat/chat-windows'], { queryParams: { chatId: (action.payLoad as ChatRoomDataModel).chatId.toString() } });
            return {
                ...state,
                payloads: newPlayLoads,
                dataInfo: action.dataInfo
            };
        }
    }
    return state;
}

/**
 * Reducer for adding the message from service to chat thread
 * @param stateName state(property) name in app store
 * @param state app state
 * @param action chat action
 */
function addMessageToThread(stateName: string, state: StoreDataInter <ChatRoomDataModel>,
    action: ChatAction): StoreDataInter <ChatRoomDataModel> {

    if (!action.stateName || stateName !== action.stateName) return state;
    if (action.type !== ChatActionEnum.NEW_UNREAD_MESSAGE) return state;
    if (action.dataInfo.dataStatus !== StoreDataStatus.COMPLETE)
        return { ...state, dataInfo: { ...action.dataInfo } };

    const newPayLoads = state.payloads.slice();
    const find = newPayLoads.find((each) => each.chatId === action.chatId);
    if (!find) return state;
    if (Array.isArray(action.payLoad)) {
        find.addMessages((action.payLoad as ChatMessage[]));
    } else {
        find.addMessage((action.payLoad as ChatMessage));
    }
    return {
        ...state,
        payloads: newPayLoads,
        dataInfo: action.dataInfo
        };

}

/**
 *  Reudcer about adding new member/s to chat room
 * @param chatSocket socket service
 * @param stateName state(property) name in app store
 * @param state app state
 * @param action chat action
 * @param router router for redirect
 */
function newChatMember(chatSocket: ChatSocketService,
    stateName: string,
    state: StoreDataInter<ChatRoomDataModel>,
    action: ChatAction,
    router: Router): StoreDataInter<ChatRoomDataModel> {

    if (!action.stateName || action.stateName !== stateName)
        return state;
    if (action.type !== ChatActionEnum.ADD_CHAT_MEMBER &&
        action.type !== ChatActionEnum.GET_NEW_CHAT_MEMBER &&
        action.type !== ChatActionEnum.SUBSCRIBE_GET_NEW_CHAT_MEMBER) {
        return state;
    }

    if (action.dataInfo.dataStatus === StoreDataStatus.ERROR || StoreDataStatus.LOADING)
        return { ...state, dataInfo: {...action.dataInfo} };

    switch (action.type) {
        case ChatActionEnum.ADD_CHAT_MEMBER : {
            if (!(action.payLoad instanceof AddChatMemberModel)) {
                throw new Error(`AppStore error, action.payload cannot be null and must be
                instance of AddChatMemberModel when action.type = ChatActionEnum.ADD_CHAT_MEMBER
                `);
            }
            chatSocket.addMemberToChat(action.payLoad);
            return state;
        }

        case ChatActionEnum.GET_NEW_CHAT_MEMBER : {
            if (!Array.isArray(action.payLoad))
                throw new Error('AppStore Error: action.paylod mube be ChatRoomMemberDataModel[] when action.type = ChatActionEnum.GET_NEW_CHAT_MEMBER');
            if (!action.chatId)
                throw new Error('AppStore error, action.chatId cannot be null when action.type = ChatActionEnum.GET_NEW_CHAT_MEMBER');

            const newPayLoads = state.payloads.slice();

            const find  = newPayLoads.find((each) => each.chatId === action.chatId);

            if (!find)
                throw new Error('AppStor error, can not add a new members to chat thred that is not exist');

            find.addMembers(action.payLoad);

            return {
                ...state,
                payloads: newPayLoads,
                dataInfo : action.dataInfo
            };
        }
    }
    return state;
}
