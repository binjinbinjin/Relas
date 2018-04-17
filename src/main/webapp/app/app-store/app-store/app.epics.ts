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

/**App(root) level Epics, all the epics will add here */
export function createEpics(friendshipService: FriendshipRequestService,
    friendshipControlService: FriendshipControlService,
    portfolioService: UserPortfolioService,
    chatSocket: ChatSocketService,
    chatRoomService: ChatRoomService,
    unreadMessagService: UnreadChatMessageService) {
        return [
            getFriendRequest(friendshipService), // Epics for friend-control
            getFriendList(friendshipControlService, portfolioService), // Epics for friend-list
            /**Chat */
            // newChatEpic(chatRoomService),
            newMessageSubscriberEpic(chatSocket) ,
            loadAllChatRoomEpic(portfolioService, chatRoomService, unreadMessagService),
            beenAddToNewChatRoomEpic(chatSocket, chatRoomService, portfolioService),
            serviceAddNewMemberToChatRoomEpic(chatSocket, portfolioService),
            newChatRoomAndMemberEpic(chatSocket, portfolioService),
        ];
}
