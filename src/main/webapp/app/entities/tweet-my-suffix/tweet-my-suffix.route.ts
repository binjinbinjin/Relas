import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TweetMySuffixComponent } from './tweet-my-suffix.component';
import { TweetMySuffixDetailComponent } from './tweet-my-suffix-detail.component';
import { TweetMySuffixPopupComponent } from './tweet-my-suffix-dialog.component';
import { TweetMySuffixDeletePopupComponent } from './tweet-my-suffix-delete-dialog.component';

export const tweetRoute: Routes = [
    {
        path: 'tweet-my-suffix',
        component: TweetMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.tweet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tweet-my-suffix/:id',
        component: TweetMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.tweet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tweetPopupRoute: Routes = [
    {
        path: 'tweet-my-suffix-new',
        component: TweetMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.tweet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tweet-my-suffix/:id/edit',
        component: TweetMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.tweet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tweet-my-suffix/:id/delete',
        component: TweetMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.tweet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
