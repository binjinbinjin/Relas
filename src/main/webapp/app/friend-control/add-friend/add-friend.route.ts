import { AddFriendComponent } from './add-friend.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';

export const addFriendRoute: Route = {
    path: 'friend/add-friend',
    component: AddFriendComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
};
