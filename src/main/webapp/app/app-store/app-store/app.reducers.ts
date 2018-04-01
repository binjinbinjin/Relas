import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';

import { receivedRequestReducer, sendRequestReducer } from '../friend-control/friend-control.reducers';
import { FriendshipRequestService } from '../service/friendshipRequest.service';

/**App(root) level reducer, all the epics will add here */
export const rootReducer = (friendshipService: FriendshipRequestService) => composeReducers(
    defaultFormReducer(),
    combineReducers({
        addFriend: sendRequestReducer(friendshipService),
        receivedRequest: receivedRequestReducer(),
        router: routerReducer,
    }));
