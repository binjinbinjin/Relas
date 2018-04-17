import { ChatWindowComponent } from './chat-window.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const chatWindowsRoute: Route = {
    path: 'chat/chat-windows',
    component: ChatWindowComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
};
