import { UserPortfolioService } from '../../user-portfolio/user-portfolio-service/user-portfolio.service';
import {
    beenAddToNewChatRoomEpic,
    loadAllChatRoomEpic,
    newMessageSubscriberEpic,
    serviceAddNewMemberToChatRoomEpic,
    newChatRoomAndMemberEpic,
} from '../chat/chat.epics';
import { getFriendRequest } from '../friend-control/friend-control.epics';
import { getFriendList } from '../friend-list/friend-list.epics';
import { ChatRoomService } from '../service/chat-room.service';
import { ChatSocketService } from '../service/chat-socket.service';
import { FriendshipControlService } from '../service/friendshipControl.service';
import { FriendshipRequestService } from '../service/friendshipRequest.service';
import { UnreadChatMessageService } from '../service/unread-chat-message.service';
import { EpicMiddleware, createEpicMiddleware, Epic } from 'redux-observable';

/**App(root) level Epics, all the epics will add here */
// export function createEpics(friendshipService: FriendshipRequestService,
//     friendshipControlService: FriendshipControlService,
//     portfolioService: UserPortfolioService,
//     chatSocket: ChatSocketService,
//     chatRoomService: ChatRoomService,
//     unreadMessagService: UnreadChatMessageService) {
//         return [
//             getFriendRequest(friendshipService), // Epics for friend-control
//             getFriendList(friendshipControlService, portfolioService), // Epics for friend-list
//             /**Chat */
//             // newChatEpic(chatRoomService),
//             newMessageSubscriberEpic(chatSocket) ,
//             loadAllChatRoomEpic(portfolioService, chatRoomService, unreadMessagService),
//             beenAddToNewChatRoomEpic(chatSocket, chatRoomService, portfolioService),
//             serviceAddNewMemberToChatRoomEpic(chatSocket, portfolioService),
//             newChatRoomAndMemberEpic(chatSocket, portfolioService),
//         ];
// }

export class EpicsMiddleWares {

    middleWares: EpicMiddleware<any, any, any, any>[];

    private epics: Epic< any, any, any, any >[];

    constructor(friendshipService: FriendshipRequestService,
        friendshipControlService: FriendshipControlService,
        portfolioService: UserPortfolioService,
        chatSocket: ChatSocketService,
        chatRoomService: ChatRoomService,
        unreadMessagService: UnreadChatMessageService) {
        this.epics = [];
        this.middleWares = [];
        let i = 0;
        this.epics.push(getFriendRequest(friendshipService)); // Epics for friend-control
        this.epics.push(getFriendList(friendshipControlService, portfolioService)); // Epics for friend-list
        /**Chat */
        // newChatEpic(chatRoomService),
        this.epics.push(newMessageSubscriberEpic(chatSocket));
        this.epics.push(loadAllChatRoomEpic(portfolioService, chatRoomService, unreadMessagService));
        this.epics.push(beenAddToNewChatRoomEpic(chatSocket, chatRoomService, portfolioService));
        this.epics.push(serviceAddNewMemberToChatRoomEpic(chatSocket, portfolioService));
        this.epics.push(newChatRoomAndMemberEpic(chatSocket, portfolioService));

        for ( i = 0; i < this.epics.length; i++)
            this.middleWares.push(createEpicMiddleware());
    }

    runMiddleWare() {
        for (let i = 0; i < this.epics.length; i ++) {
            this.middleWares[i].run(this.epics[i]);
        }
    }

}
