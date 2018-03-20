import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UnreadChatMessageMySuffixComponent } from './unread-chat-message-my-suffix.component';
import { UnreadChatMessageMySuffixDetailComponent } from './unread-chat-message-my-suffix-detail.component';
import { UnreadChatMessageMySuffixPopupComponent } from './unread-chat-message-my-suffix-dialog.component';
import { UnreadChatMessageMySuffixDeletePopupComponent } from './unread-chat-message-my-suffix-delete-dialog.component';

export const unreadChatMessageRoute: Routes = [
    {
        path: 'unread-chat-message-my-suffix',
        component: UnreadChatMessageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.unreadChatMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'unread-chat-message-my-suffix/:id',
        component: UnreadChatMessageMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.unreadChatMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unreadChatMessagePopupRoute: Routes = [
    {
        path: 'unread-chat-message-my-suffix-new',
        component: UnreadChatMessageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.unreadChatMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unread-chat-message-my-suffix/:id/edit',
        component: UnreadChatMessageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.unreadChatMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unread-chat-message-my-suffix/:id/delete',
        component: UnreadChatMessageMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.unreadChatMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
