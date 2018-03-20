import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChatRoomMemberMySuffixComponent } from './chat-room-member-my-suffix.component';
import { ChatRoomMemberMySuffixDetailComponent } from './chat-room-member-my-suffix-detail.component';
import { ChatRoomMemberMySuffixPopupComponent } from './chat-room-member-my-suffix-dialog.component';
import { ChatRoomMemberMySuffixDeletePopupComponent } from './chat-room-member-my-suffix-delete-dialog.component';

export const chatRoomMemberRoute: Routes = [
    {
        path: 'chat-room-member-my-suffix',
        component: ChatRoomMemberMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoomMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-room-member-my-suffix/:id',
        component: ChatRoomMemberMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoomMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatRoomMemberPopupRoute: Routes = [
    {
        path: 'chat-room-member-my-suffix-new',
        component: ChatRoomMemberMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoomMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-room-member-my-suffix/:id/edit',
        component: ChatRoomMemberMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoomMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-room-member-my-suffix/:id/delete',
        component: ChatRoomMemberMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.chatRoomMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
