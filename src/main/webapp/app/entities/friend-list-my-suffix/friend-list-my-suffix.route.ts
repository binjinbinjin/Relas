import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FriendListMySuffixComponent } from './friend-list-my-suffix.component';
import { FriendListMySuffixDetailComponent } from './friend-list-my-suffix-detail.component';
import { FriendListMySuffixPopupComponent } from './friend-list-my-suffix-dialog.component';
import { FriendListMySuffixDeletePopupComponent } from './friend-list-my-suffix-delete-dialog.component';

export const friendListRoute: Routes = [
    {
        path: 'friend-list-my-suffix',
        component: FriendListMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.friendList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'friend-list-my-suffix/:id',
        component: FriendListMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.friendList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const friendListPopupRoute: Routes = [
    {
        path: 'friend-list-my-suffix-new',
        component: FriendListMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.friendList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'friend-list-my-suffix/:id/edit',
        component: FriendListMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.friendList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'friend-list-my-suffix/:id/delete',
        component: FriendListMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.friendList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
