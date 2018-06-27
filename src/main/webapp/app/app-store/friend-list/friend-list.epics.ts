
import {from as observableFrom,  of ,  Observable } from 'rxjs';

import {startWith, map, mergeMap, catchError} from 'rxjs/operators';
import { FriendListModel } from './../../friend-control/friend-control-model/friend-list.model';

import { ActionsObservable, createEpicMiddleware, Epic } from 'redux-observable';

import { FriendControlActionEnum } from '../../friend-control/friend-control-model/friend-control-action.model';
import { AppStoreState, StoreDataStatus } from '../app-store/app.store.model';
import { FriendshipControlService } from '../service/friendshipControl.service';
import { FriendlistAction } from './friend-list.action';
import { UserPortfolio } from '../../user-portfolio/user-portfolio.model';
import { UserPortfolioService } from '../../user-portfolio/user-portfolio-service/user-portfolio.service';
import { newMessage } from '../chat/chat.reducers';

/**Create a Epic (middleware) to get the friend list
 *@param friendshipControlService The service to get friend list
 *
*/
export function getFriendList(friendshipControlService: FriendshipControlService, portfolioService: UserPortfolioService) {
    return getFriendListImpl(friendshipControlService, portfolioService); // create the middleware
}

/**Get friend list impl, that use to create the middleware
 * @param friendshipControlService The service to get friend list
 */
function getFriendListImpl(friendshipControlService: FriendshipControlService, portfolioService: UserPortfolioService): Epic<FriendlistAction, FriendlistAction, AppStoreState> {
    return (action$: ActionsObservable<FriendlistAction>, stroe) => {
        return action$.ofType(FriendControlActionEnum.GET_LIST).pipe(
        mergeMap(() => {
            return friendshipControlService.receive().pipe(mergeMap((response) => {
                return observableFrom(convetToUseableFriendListModel(response, portfolioService)).pipe(map((listRes) => {
                    return {
                        type: FriendControlActionEnum.NEW_FRIEND_LIST,
                        list: listRes,
                        dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                    };
                }),
                catchError((listRes) => of ({ // catch for errors
                type: FriendControlActionEnum.NEW_FRIEND_LIST,
                list: null,
                dataInfo: { dataStatus: StoreDataStatus.ERROR }
                }
                )),
                startWith({ // makes the dataInfo.dataStatus as loading
                    type: FriendControlActionEnum.NEW_FRIEND_LIST,
                    list: null,
                    dataInfo: { dataStatus: StoreDataStatus.LOADING }
                }));
            }),
            catchError((listRes) => of({ // catch for errors
                type: FriendControlActionEnum.NEW_FRIEND_LIST,
                list: null,
                dataInfo: { dataStatus: StoreDataStatus.ERROR }
            }
            )));
        }));
    };
}

async function getPorfolio(profolio: UserPortfolioService, login): Promise<UserPortfolio> {
    const result = await profolio.fetchPortfolioByLogin(login).pipe(map((res) => res.body)).toPromise();
    return result;
}

async function setFriendListMember(member: FriendListModel, profolioService: UserPortfolioService): Promise<FriendListModel> {
    const portfolio = await getPorfolio(profolioService, member.friendIDLogin);
    member.setFriendDescription(portfolio.description);
    member.setfriendImage(portfolio.image);
    member.setFriendImageContentType(portfolio.imageContentType);
    member.setFriendDisplayName(portfolio.displayName);
    return member;
}

async function convetToUseableFriendListModel(response, portfolioService: UserPortfolioService): Promise<FriendListModel[]> {
    const list: FriendListModel[] = [];
    if (!Array.isArray(response)) {
        list.push(await createFriendListModel((response as FriendListModel), portfolioService)) ;
    }else {
        for (const each of response) {
            list.push(await createFriendListModel((each as FriendListModel), portfolioService));
        }
    }
    return list;
}

async function createFriendListModel(element: FriendListModel, portfolioService: UserPortfolioService): Promise<FriendListModel> {
    const newElement = new FriendListModel(
        element.id,
        element.userRelationship,
        element.remark,
        element.userIDLogin,
        element.userIDId,
        element.friendIDLogin,
        element.friendIDId);
    return await setFriendListMember(newElement, portfolioService);
}
