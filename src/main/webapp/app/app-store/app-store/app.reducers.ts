import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { Router } from '@angular/router';
import { combineReducers } from 'redux';

import { CHAT_THREADS } from '../chat/chat.data';
import { existThreadReduder, newMessage } from '../chat/chat.reducers';
import { receivedRequestReducer, sendRequestReducer } from '../friend-control/friend-control.reducers';
import { friendlistReduers, sendFriendListActionReducer } from '../friend-list/friend-list.reducers';
import { ChatSocketService } from '../service/chat-socket.service';
import { FriendshipControlService } from '../service/friendshipControl.service';
import { FriendshipRequestService } from '../service/friendshipRequest.service';
import { UnreadChatMessageService } from '../service/unread-chat-message.service';

/**App(root) level reducer, all the epics will add here */
export const rootReducer = (friendshipService: FriendshipRequestService,
    friendshipControlService: FriendshipControlService,
    chatSocket: ChatSocketService,
    unreadChatMessage: UnreadChatMessageService,
    router: Router
    ) => composeReducers(
    defaultFormReducer(),
    combineReducers({
        addFriend: sendRequestReducer(friendshipService), // reducer to send a friend request
        receivedRequest: receivedRequestReducer(), // reducer to get the all friend requests
        getFriendList: friendlistReduers(),
        _sendFriendListActionToService: sendFriendListActionReducer(friendshipControlService), // reducer to add/remove friend, the data is not save in state
        router: routerReducer,
        /**Chat */
        chat_messages: newMessage(chatSocket, unreadChatMessage), // reducer for chat message
        chatThreads: existThreadReduder(CHAT_THREADS, chatSocket, router), // reducer for chat thread

    }));
