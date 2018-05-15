import { FeedsComponent } from './feeds/feeds.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

/**Route ofr display feeds */
export const displayFeedRoute: Route = {
    path: 'feed/allFeeds',
    component: FeedsComponent,
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService]
};
