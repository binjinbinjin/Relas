import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChatMessageMySuffixComponent } from './chat-message-my-suffix.component';
import { ChatMessageMySuffixDetailComponent } from './chat-message-my-suffix-detail.component';
import { ChatMessageMySuffixPopupComponent } from './chat-message-my-suffix-dialog.component';
import { ChatMessageMySuffixDeletePopupComponent } from './chat-message-my-suffix-delete-dialog.component';

export const chatMessageRoute: Routes = [
    {
        path: 'chat-message-my-suffix',
        component: ChatMessageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-message-my-suffix/:id',
        component: ChatMessageMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatMessagePopupRoute: Routes = [
    {
        path: 'chat-message-my-suffix-new',
        component: ChatMessageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-message-my-suffix/:id/edit',
        component: ChatMessageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-message-my-suffix/:id/delete',
        component: ChatMessageMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
