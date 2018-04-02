import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { ActionsObservable, createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';

import { FriendControlActionEnum } from '../../friend-control/friend-control-model/friend-control-action.model';
import { AppStoreState, StoreDataStatus } from '../app-store/app.store.model';
import { FriendshipControlService } from '../service/friendshipControl.service';
import { FriendListActionGet } from './friend-list.action';

/**Create a Epic (middleware) to get the friend list
 *@param friendshipControlService The service to get friend list
 *
*/
export function getFriendList(friendshipControlService: FriendshipControlService) {
    return createEpicMiddleware(getFriendListImpl(friendshipControlService)); // create the middleware
}

/**Get friend list impl, that use to create the middleware
 * @param friendshipControlService The service to get friend list
 */
 function getFriendListImpl(friendshipControlService: FriendshipControlService): Epic<FriendListActionGet, AppStoreState> {
    return (action$: ActionsObservable<FriendListActionGet>, stroe) => {
        return action$.ofType(FriendControlActionEnum.GET_LIST)
        .mergeMap(() => {
            return friendshipControlService.receive().map((response) => {
                // create a new action for the new coming data
                const newAction: FriendListActionGet = {
                    type: FriendControlActionEnum.NEW_FRIEND,
                    list: response,
                    dataInfo: { dataStatus: StoreDataStatus.COMPLETE}
                };
                // if the 'response' is not an array return
                if (!Array.isArray(response))
                    return newAction;
                // 'response' is an array, then marks the response as array
                newAction.type = FriendControlActionEnum.NEW_FRIEND_LIST;

                return newAction;
            })
            .catch((response) => of ({ // catch for errors
                type: FriendControlActionEnum.NEW_FRIEND_LIST,
                list: null,
                dataInfo: { dataStatus: StoreDataStatus.ERROR }
                }
            ))
            .startWith({ // makes the dataInfo.dataStatus as loading
                type: FriendControlActionEnum.NEW_FRIEND_LIST,
                list: null,
                dataInfo: { dataStatus: StoreDataStatus.LOADING }
            });
        });
    };
}
