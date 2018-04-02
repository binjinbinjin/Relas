import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';

import { receivedRequestReducer, sendRequestReducer } from '../friend-control/friend-control.reducers';
import { FriendshipRequestService } from '../service/friendshipRequest.service';
import { getFriendListReducer, sendFriendListActionReducer } from '../friend-list/friend-list.reducers';
import { FriendshipControlService } from '../service/friendshipControl.service';

/**App(root) level reducer, all the epics will add here */
export const rootReducer = (friendshipService: FriendshipRequestService, friendshipControlService: FriendshipControlService) => composeReducers(
    defaultFormReducer(),
    combineReducers({
        addFriend: sendRequestReducer(friendshipService), // reducer to send a friend request
        receivedRequest: receivedRequestReducer(), // reducer to get the all friend requests
        getFriendList: getFriendListReducer(), // reducer to get friend list
        sendFriendListActionToService: sendFriendListActionReducer(friendshipControlService), // reducer to add/remove friend, the data is not save in state
        router: routerReducer,
    }));
