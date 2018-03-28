import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';

import { FriendshipService } from '../friendship.service';
import { receivedRequestReducer, sendRequestReducer } from '../friend-control/friend-control.reducers';

/**App(root) level reducer, all the epics will add here */
export const rootReducer = (friendshipService: FriendshipService) => composeReducers(
    defaultFormReducer(),
    combineReducers({
        addFriend: sendRequestReducer(friendshipService),
        receivedRequest: receivedRequestReducer(),
        router: routerReducer,
    }));
