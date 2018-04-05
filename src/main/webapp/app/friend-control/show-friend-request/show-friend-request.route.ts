import { Route } from '@angular/router';
import { ShowFriendRequestComponent } from './show-friend-request.component';
import { UserRouteAccessService } from '../../shared';

export const showFriendRequestRoute: Route = {
    path: 'friend/friend-request',
    component: ShowFriendRequestComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
};
