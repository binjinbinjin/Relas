import { FriendListModel } from './../../friend-control/friend-control-model/friend-list.model';
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
import { FriendlistAction } from './friend-list.action';
import { UserPortfolio } from '../../user-portfolio/user-portfolio.model';
import { UserPortfolioService } from '../../user-portfolio/user-portfolio-service/user-portfolio.service';
import { newMessage } from '../chat/chat.reducers';
import { Observable } from 'rxjs/Observable';

/**Create a Epic (middleware) to get the friend list
 *@param friendshipControlService The service to get friend list
 *
*/
export function getFriendList(friendshipControlService: FriendshipControlService, portfolioService: UserPortfolioService) {
    return createEpicMiddleware(getFriendListImpl(friendshipControlService, portfolioService)); // create the middleware
}

/**Get friend list impl, that use to create the middleware
 * @param friendshipControlService The service to get friend list
 */
function getFriendListImpl(friendshipControlService: FriendshipControlService, portfolioService: UserPortfolioService): Epic<FriendlistAction, AppStoreState> {
    return (action$: ActionsObservable<FriendlistAction>, stroe) => {
        return action$.ofType(FriendControlActionEnum.GET_LIST)
        .mergeMap(() => {
            return friendshipControlService.receive().mergeMap((response) => {
                return Observable.fromPromise(convetToUseableFriendListModel(response, portfolioService)).map((listRes) => {
                    return {
                        type: FriendControlActionEnum.NEW_FRIEND_LIST,
                        list: listRes,
                        dataInfo: { dataStatus: StoreDataStatus.COMPLETE }
                    };
                })
                .catch((listRes) => of ({ // catch for errors
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
            })
            .catch((listRes) => of({ // catch for errors
                type: FriendControlActionEnum.NEW_FRIEND_LIST,
                list: null,
                dataInfo: { dataStatus: StoreDataStatus.ERROR }
            }
            ));
        });
    };
}

async function getPorfolio(profolio: UserPortfolioService, login): Promise<UserPortfolio> {
    const result = await profolio.fetchPortfolioByLogin(login).map((res) => res.body).toPromise();
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
