import { Route } from '@angular/router';
import { ChatThreadsComponent } from './chat-threads.component';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';

export const chatThreadsRoute: Route = {
    path: 'chat/threads/:login',
    component: ChatThreadsComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
};
