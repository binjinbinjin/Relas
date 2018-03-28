import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { ActionsObservable, createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';

import { StoreDataStatus } from '../app-store/app.store.model';
import { FriendshipService } from '../friendship.service';
import { AppStoreState } from './../app-store/app.store.model';
import { FriendControlActionRequestAction, FriendControlActionsList } from './friend-control.action';

/**Epic for received the request from service
 * To work properly, a function with @dispatch() and return FriendControlActionBasic with type
 * FriendControlActionsList.RECEIVED_REQUEST must be call after initialized of the store
 *
 * param: friendshipService FriendshipService
 *          service that with an observable function to subscribe the request from the service
 */
export function getFriendRequest(friendshipService: FriendshipService) {
    // create the middleware
    return createEpicMiddleware(getFriendRequestImp(friendshipService));
}

/**Epic to get the request from the service
 *
 * Intercept all the action with type FriendControlActionsList.RECEIVED_REQUEST
 *
 * param: friendshipService FriendshipService
 *          service that with an observable function to subscribe the request from the service
 */
function getFriendRequestImp(friendshipService: FriendshipService): Epic<FriendControlActionRequestAction, AppStoreState> {
    return (action$: ActionsObservable<FriendControlActionRequestAction>, store) => {
        return action$.ofType(FriendControlActionsList.RECEIVED_REQUEST)
        .mergeMap(() => {
            // get the request from service
            return friendshipService.receive().map((response) => {
                // if a new request arrived, then publich a action with tyep FriendControlActionsList.NEW_REQUEST
                return {
                type: FriendControlActionsList.NEW_REQUEST,
                request: response,
                dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                };
            })
            .catch( (response) =>
            of( // if error occured, publich an error action
                {
                    type: FriendControlActionsList.NEW_REQUEST,
                    request: null,
                    dataInfo: { dataStatus: StoreDataStatus.ERROR }
                }
            ))
            .startWith({
                // publish an action telling the store that we are started to fetching the request form the service
                type: FriendControlActionsList.NEW_REQUEST,
                request: null,
                dataInfo: { dataStatus: StoreDataStatus.LOADING }
            });
        });
    };
}
