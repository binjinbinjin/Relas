
import {from as observableFrom,  Observable ,  of } from 'rxjs';

import {startWith, map, catchError, mergeMap} from 'rxjs/operators';







import { ActionsObservable, createEpicMiddleware, Epic } from 'redux-observable';

import { CreateNewRoomAndAddChatMemberModel } from '../../chat/model/add-chat-member.model';
import { ChatMessage, ChatMessageModel, convertChatMessageModelToChatMessageB } from '../../chat/model/chat-message.model';
import { ChatRoomMemberModel } from '../../chat/model/chat-room-member.model';
import {
    ChatMessageImageDisplayModel,
    ChatRoomDataModel,
    ChatRoomMemberDataModel,
    ChatRoomModel,
    ChatRoomsAndMembersModel,
} from '../../chat/model/chat-room.model';
import { FriendListModel } from '../../friend-control/friend-control-model/friend-list.model';
import { UserPortfolioService } from '../../user-portfolio/user-portfolio-service/user-portfolio.service';
import { UserPortfolio } from '../../user-portfolio/user-portfolio.model';
import { AppStoreState, StoreDataStatus } from '../app-store/app.store.model';
import { ChatRoomService } from '../service/chat-room.service';
import { ChatSocketService } from '../service/chat-socket.service';
import { UnreadChatMessageService } from '../service/unread-chat-message.service';
import { ChatAction, ChatActionEnum } from './chat.action';
import { CHAT_THREADS } from './chat.data';

/**
 * Middleware that will subscribe the socket, and publish a new action for every
 * new chat message from service
 * @param chatSocket chat Socket
 */
export function newMessageSubscriberEpic(chatSocket: ChatSocketService) {
    return createEpicMiddleware(newMessage(chatSocket));
}

/**
 * Middleware that will loading the all exist chat thread for current login user
 * @param portfolioService service for getting user portfolio
 * @param chatRoomService chat room http service
 * @param unreadMessagService unread message http service
 */
export function loadAllChatRoomEpic(portfolioService: UserPortfolioService,
    chatRoomService: ChatRoomService, unreadMessagService: UnreadChatMessageService) {

    return createEpicMiddleware(loadAllChatRoom(portfolioService, chatRoomService, unreadMessagService));
}

/**
 * Middleware that will subsribe the socket, and publich a new action when current login user have been add to a new chat room
 * @param chatSocket chat socket
 * @param chatRoomService chat room http service
 * @param portfolioServie service for getting user portfolio
 */
export function beenAddToNewChatRoomEpic(chatSocket: ChatSocketService,
    chatRoomService: ChatRoomService, portfolioService: UserPortfolioService) {

    return createEpicMiddleware(beenAddToNewChatRoom(chatSocket, chatRoomService, portfolioService));
}

/**
 * Middleware that will subcribe new member to chat room
 * - Result for adding new member/s to chat thread (ChatActionEnum.ADD_CHAT_MEMBER )
 * - The return value for action ChatActionEnum.ADD_CHAT_MEMBER will be get from here
 * @param chatSocket chat socket
 * @param portfolioService service for getting user portfolio
 */
export function serviceAddNewMemberToChatRoomEpic(
    chatSocket: ChatSocketService,
    portfolioService: UserPortfolioService) {

    return createEpicMiddleware(serviceAddNewMemberToChatRoom(chatSocket, portfolioService));
}

/**
 * Middleware that will subcribe the new chat room and members
 * - Result for creating an new chat thread request(ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS)
 * - The return value for action ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS will be get from here
 * @param chatSocket chat socket
 * @param portfolioService service for getting user portfolio
 */
export function newChatRoomAndMemberEpic(
    chatSocket: ChatSocketService,
    portfolioService: UserPortfolioService) {

    return createEpicMiddleware(newChatRoomAndMember(chatSocket, portfolioService));
}

/**
 * Loading the all exist chat thread for current login user
 * @param portfolioService service for getting user portfolio
 * @param chatRoomService chat room http service
 * @param unreadMessagService unread message http service
 */
function loadAllChatRoom(
    portfolioService: UserPortfolioService,
    chatRoomService: ChatRoomService,
    unreadMessagService: UnreadChatMessageService): Epic<ChatAction, AppStoreState> {

    return (action$: ActionsObservable<ChatAction>, store) => {
        return action$.ofType(ChatActionEnum.INITIAL_GET_ALL_CHAT_ROOM_FROM_SERVICE).pipe(
            mergeMap((actoin) => {
                return chatRoomService.getChatRoomsAndMembersWhenLoginChange().pipe(mergeMap((rooms: ChatRoomsAndMembersModel[]) => {
                    return observableFrom(convertChatRoomAndMembersIntoChatRoomDataModel(portfolioService, store, rooms)).pipe(
                            mergeMap((dataModel) => {
                        return unreadMessagService.getAllUnreadMessage().pipe(map((res: ChatMessageModel[]) => {
                            const unreadMessages = res;
                            const chatMessages: ChatMessage[] = [];
                            const login = chatRoomService.userLogin;

                            unreadMessages.forEach((each) => {
                                const message = findImageFromChatAndConvetToChatMessage(store, each);
                                message.sendInMessage = message.senderLogin === login ? false : true;
                                chatMessages.push(message);
                            });

                            return {
                                type: ChatActionEnum.NEW_UNREAD_MESSAGE,
                                payLoad: chatMessages,
                                chatId: chatMessages[0].id,
                                stateName: CHAT_THREADS,
                                dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                            };
                        }),
                        catchError((response) =>
                            of( // if error occured, publich an error action
                                {
                                    type: ChatActionEnum.NEW_UNREAD_MESSAGE,
                                    stateName: CHAT_THREADS,
                                    dataInfo: { dataStatus: StoreDataStatus.ERROR }
                                }
                            )),
                        startWith({
                            type: ChatActionEnum.RECEIVED_CHAT_ROOMS,
                            payLoad: dataModel,
                            stateName: CHAT_THREADS,
                            dataInfo: { dataStatus: StoreDataStatus.SENT }
                        }),
                        startWith({
                            type: ChatActionEnum.NEW_UNREAD_MESSAGE,
                            stateName: CHAT_THREADS,
                            dataInfo: { dataStatus: StoreDataStatus.LOADING }
                        }),);
                    }),
                    catchError((response) =>
                        of( // if error occured, publich an error action
                            {
                                type: ChatActionEnum.RECEIVED_CHAT_ROOMS,
                                stateName: CHAT_THREADS,
                                dataInfo: { dataStatus: StoreDataStatus.ERROR }
                            }
                        )),
                    startWith({
                        type: ChatActionEnum.RECEIVED_CHAT_ROOMS,
                        stateName: CHAT_THREADS,
                        dataInfo: { dataStatus: StoreDataStatus.LOADING }
                    }),);
                }));
            }));
    };
}

/**
 * Subcribe new member to chat room
 * - Result for adding new member/s to chat thread (ChatActionEnum.ADD_CHAT_MEMBER )
 * - The return value for action ChatActionEnum.ADD_CHAT_MEMBER will be get from here
 * @param chatSocket chat socket
 * @param portfolioService service for getting user portfolio
 */
function serviceAddNewMemberToChatRoom(
    chatSocket: ChatSocketService,
    portfolioService: UserPortfolioService): Epic<ChatAction, AppStoreState> {

    return (action$: ActionsObservable<ChatAction>, store) => {
        return action$.ofType(ChatActionEnum.SUBSCRIBE_GET_NEW_CHAT_MEMBER).pipe(
            mergeMap((action) => {
                return chatSocket.receiveNewChatRoomMember().pipe(mergeMap((members) => {
                    return observableFrom(convertMemberModelListToDatMemberModelList(portfolioService, store, members)).pipe(
                            map((list) => {

                        return {
                            type: ChatActionEnum.GET_NEW_CHAT_MEMBER,
                            payLoad: list,
                            stateName: CHAT_THREADS,
                            dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                        };
                    }),
                    catchError((response) =>
                        of( // if error occured, publich an error action
                            {
                                type: ChatActionEnum.GET_NEW_CHAT_MEMBER,
                                stateName: CHAT_THREADS,
                                dataInfo: { dataStatus: StoreDataStatus.ERROR }
                            }
                        )),
                    startWith({
                        type: ChatActionEnum.GET_NEW_CHAT_MEMBER,
                        stateName: CHAT_THREADS,
                        dataInfo: { dataStatus: StoreDataStatus.LOADING }
                    }),);
                }));
            }));
    };
}

/**
 * Subcribe the new chat room and members
 * - Result for creating an new chat thread request(ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS)
 * - The return value for action ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS will be get from here
 * @param chatSocket chat socket
 * @param portfolioService service for getting user portfolio
 */
function newChatRoomAndMember(chatSocket: ChatSocketService,
    portfolioService: UserPortfolioService): Epic<ChatAction, AppStoreState>  {

    return (action$: ActionsObservable<ChatAction>, store) => {
        return action$.ofType(ChatActionEnum.SUBSCRIBE_NEW_CHAT_ROOM_WITH_MEMBERS).pipe(
        mergeMap((action) => {
            return chatSocket.receiveNewChatRoomAndMembers().pipe(mergeMap((res: CreateNewRoomAndAddChatMemberModel) => {
                const chatRoom = new ChatRoomDataModel();
                chatRoom.initialUsingChatRoomModel(res.room);
                return observableFrom(convertMemberModelListToDatMemberModelList(portfolioService, store, res.roomMembers)).pipe(
                        map((memberDataModel: ChatRoomMemberDataModel[]) => {
                    chatRoom.addMembers(memberDataModel);
                    return { type: ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS,
                        stateName: CHAT_THREADS,
                        payLoad: chatRoom,
                        dataInfo: { dataStatus: StoreDataStatus.COMPLETE },
                        redirect: true};
                }),
                catchError((response) =>
                    of( // if error occured, publich an error action
                        {
                            type: ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS,
                            stateName: CHAT_THREADS,
                            dataInfo: { dataStatus: StoreDataStatus.ERROR }
                        }
                    )),
                    startWith({
                        type: ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS,
                        stateName: CHAT_THREADS,
                        dataInfo: { dataStatus: StoreDataStatus.LOADING }
                }),);
            }));
        }));
    };
}

/**
 * Subsribe the socket, and publich a new action when current login user have been add to a new chat room
 * @param chatSocket chat socket
 * @param chatRoomService chat room http service
 * @param portfolioServie service for getting user portfolio
 */
function beenAddToNewChatRoom(
    chatSocket: ChatSocketService,
    chatRoomService: ChatRoomService,
    portfolioService: UserPortfolioService): Epic<ChatAction, AppStoreState> {

    return (action$: ActionsObservable<ChatAction>, store) => {
        return action$.ofType(ChatActionEnum.BEEN_ADD_TO_A_CAHT_ROOM).pipe(
        mergeMap((action) => {
            return chatSocket.receiveNewChatRoom().pipe(mergeMap((room: ChatRoomModel) => {
                if (!room.chatID)
                    throw new Error('chatId can not be null');
                return chatRoomService.fetchChatRoomMembersByChatId(room.chatID).pipe(mergeMap((members: ChatRoomMemberModel[]) => {
                    const chatRoom = new ChatRoomDataModel();
                    chatRoom.initialUsingChatRoomModel(room);
                    return observableFrom(convertMemberModelListToDatMemberModelList(portfolioService, store, members)).pipe(
                            map((memberDataModel: ChatRoomMemberDataModel[] ) => {

                        chatRoom.addMembers(memberDataModel);
                        return {
                            type: ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS,
                            stateName: CHAT_THREADS,
                            payLoad: chatRoom,
                            dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                        };
                    }),
                    catchError((response) =>
                        of( // if error occured, publich an error action
                            {
                                type: ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS ,
                                stateName: CHAT_THREADS,
                                dataInfo: { dataStatus: StoreDataStatus.ERROR }
                            }
                        )),
                    startWith({
                        type: ChatActionEnum.NEW_CHAT_ROOM_WITH_MEMBERS ,
                        stateName: CHAT_THREADS,
                        dataInfo: { dataStatus: StoreDataStatus.LOADING}
                    }),);
                }));
            }));
        }));
    };
}

/**
 * Subscribe the socket, and publish a new action for every new chat message from service
 * @param chatSocket chat Socket
 */
function newMessage(chatSocket: ChatSocketService): Epic<ChatAction, AppStoreState> {
    return (action$: ActionsObservable<ChatAction>, store) => {
        return action$.ofType(ChatActionEnum.SUBSCRIBE_UNREAD_MESSAGE_FROM_SERVICE).pipe(
            mergeMap((action) => {
                return chatSocket.receiveNewMessage().pipe(
                    map((response: ChatMessageModel) => {
                        const chatMessage = findImageFromChatAndConvetToChatMessage(store, response);
                        chatMessage.sendInMessage = response.messageSenderLogin === chatSocket.userLogin ? false : true;
                        return {
                            type: ChatActionEnum.NEW_UNREAD_MESSAGE,
                            payLoad: chatMessage,
                            chatId: chatMessage.id,
                            stateName: CHAT_THREADS,
                            dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                        };
                    }),
                    catchError((response) =>
                        of( // if error occured, publich an error action
                            {
                                type: ChatActionEnum.NEW_UNREAD_MESSAGE,
                                stateName: CHAT_THREADS,
                                dataInfo: { dataStatus: StoreDataStatus.ERROR }
                            }
                        )),
                    startWith({
                        type: ChatActionEnum.NEW_UNREAD_MESSAGE,
                        stateName: CHAT_THREADS,
                        dataInfo: { dataStatus: StoreDataStatus.LOADING }
                    }),);
            }));
    };
}

/**
 * Utility interface
 * An data wrapper, that use to wrapped the ChatMessageImageDisplayModel object and user display name
 */
interface Wrapper {
    _image: ChatMessageImageDisplayModel;
    _name: string;
}

/**
 * Utility method for convet the ChatMessageModel into ChatMessage
 * - this method will get the image for message sender from the chat thread
 * @param store app store
 * @param message message from service
 */
function findImageFromChatAndConvetToChatMessage(store, message: ChatMessageModel): ChatMessage {
    let image: ChatMessageImageDisplayModel;
    const chatRoom: ChatRoomDataModel = (store.getState().chatThreads.payloads as ChatRoomDataModel[]).find((each) => message.chatIDId === each.chatId);
    const chatRoomMember: ChatRoomMemberDataModel = chatRoom.members
                                                    .find((each) => each.login === message.messageSenderLogin);

    image = new ChatMessageImageDisplayModel(chatRoomMember.image, chatRoomMember.imageContentType);
    return convertChatMessageModelToChatMessageB(message, image);
}

/**
 * Utility method for getting the image and display name of chat member from friend list,
 * if friend list doesnot contains the image and dispaly name of specified user,
 * then it will getting those data from service
 * @param portfolioServie service for getting user portfolio
 * @param store app store
 * @param login user's login
 */
async function getImageAndNameFormFriendList(
    portfolioServie: UserPortfolioService,
    store,
    login: string): Promise<Wrapper> {

    let image: ChatMessageImageDisplayModel;
    let name: string;
    const senderInfo = (store.getState().getFriendList.payloads as FriendListModel[])
                    .find((each) => each.friendIDLogin === login);
    if (senderInfo && senderInfo.getFriendDisplayName() && senderInfo.getFriendImage()) {
        image = new ChatMessageImageDisplayModel(
            senderInfo.getFriendImage(),
            senderInfo.getFriendImageContentType());

        name = senderInfo.getFriendDisplayName();

    } else {
        let portfolio: UserPortfolio;
        portfolio = await portfolioServie.fetchPortfolioByLogin(login).toPromise().then((res) => res.body);
        image = new ChatMessageImageDisplayModel(portfolio.image, portfolio.imageContentType);
        name = portfolio.displayName;
    }
    return { _image: image, _name: name };

}

/**
 * Utility method for convert the ChatRoomsAndMembersModel[] into ChatRoomDataModel[]
 * @param portfolioServie service for getting user portfolio
 * @param store app store
 * @param rooms ChatRoomsAndMembersModel[] from service
 */
async function convertChatRoomAndMembersIntoChatRoomDataModel(
    portfolioService: UserPortfolioService,
    store,
    rooms: ChatRoomsAndMembersModel[]): Promise<ChatRoomDataModel[]> {

    const roomsDataModel: ChatRoomDataModel[] = [];
    for (const room of rooms) {
        const roomDataModel = new ChatRoomDataModel();
        roomDataModel.initialUsingChatRoomModel(room.chatRoom);
        const members = await convertMemberModelListToDatMemberModelList(
            portfolioService,
            store,
            room.members);

        roomDataModel.addMembers(members);
        roomsDataModel.push(roomDataModel);
    }
    return roomsDataModel;
}

/**
 * Utility method for convert ChatMemberModel[] to ChatMemberDataModel[]
 * @param portfolioServie service for getting user portfolio
 * @param store app store
 * @param member ChatRoomMemberModel objcet from service
 */
async function convertMemberModelListToDatMemberModelList(
    portfolioService: UserPortfolioService,
    store,
    members: ChatRoomMemberModel[]): Promise<ChatRoomMemberDataModel[]> {

    const chatDataModel: ChatRoomMemberDataModel[] = [];
    for (const each of members) {
        const item = await convertMemberModelToDatMemberModel(portfolioService, store, each);
        chatDataModel.push(item);
    }
    return chatDataModel;
}

/**
 * Utility method for convert ChatMemberModel to ChatMemberDataModel
 * @param portfolioServie service for getting user portfolio
 * @param store app store
 * @param member ChatRoomMemberModel objcet from service
 */
async function convertMemberModelToDatMemberModel(
    portfolioServie: UserPortfolioService,
    store,
    member: ChatRoomMemberModel): Promise<ChatRoomMemberDataModel> {

    let data: Wrapper;
    data = await getImageAndNameFormFriendList(portfolioServie, store, member.memberIDLogin);
    const dataModel = new ChatRoomMemberDataModel();
    dataModel.login = member.memberIDLogin;
    dataModel.initialFromChatRoomMeberModel(member, data._image, data._name);
    return dataModel;
}
