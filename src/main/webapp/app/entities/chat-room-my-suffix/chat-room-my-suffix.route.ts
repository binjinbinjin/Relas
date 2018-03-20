import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChatRoomMySuffixComponent } from './chat-room-my-suffix.component';
import { ChatRoomMySuffixDetailComponent } from './chat-room-my-suffix-detail.component';
import { ChatRoomMySuffixPopupComponent } from './chat-room-my-suffix-dialog.component';
import { ChatRoomMySuffixDeletePopupComponent } from './chat-room-my-suffix-delete-dialog.component';

export const chatRoomRoute: Routes = [
    {
        path: 'chat-room-my-suffix',
        component: ChatRoomMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-room-my-suffix/:id',
        component: ChatRoomMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatRoomPopupRoute: Routes = [
    {
        path: 'chat-room-my-suffix-new',
        component: ChatRoomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-room-my-suffix/:id/edit',
        component: ChatRoomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-room-my-suffix/:id/delete',
        component: ChatRoomMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
