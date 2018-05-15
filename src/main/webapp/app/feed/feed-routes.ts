import { Routes } from '@angular/router';
import { displayFeedRoute } from './display-feed/display-feed-routes';

/**Root route for feeds module */
export const feedMainRoute: Routes = [
    {
        path: 'feed', redirectTo: 'feed/allFeeds?who=friend', pathMatch: 'full'
    },
    displayFeedRoute
];
