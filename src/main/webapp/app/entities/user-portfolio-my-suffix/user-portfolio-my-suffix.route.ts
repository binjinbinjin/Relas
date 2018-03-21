import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserPortfolioMySuffixComponent } from './user-portfolio-my-suffix.component';
import { UserPortfolioMySuffixDetailComponent } from './user-portfolio-my-suffix-detail.component';
import { UserPortfolioMySuffixPopupComponent } from './user-portfolio-my-suffix-dialog.component';
import { UserPortfolioMySuffixDeletePopupComponent } from './user-portfolio-my-suffix-delete-dialog.component';

export const userPortfolioRoute: Routes = [
    {
        path: 'user-portfolio-my-suffix',
        component: UserPortfolioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.userPortfolio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-portfolio-my-suffix/:id',
        component: UserPortfolioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.userPortfolio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPortfolioPopupRoute: Routes = [
    {
        path: 'user-portfolio-my-suffix-new',
        component: UserPortfolioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.userPortfolio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-portfolio-my-suffix/:id/edit',
        component: UserPortfolioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.userPortfolio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-portfolio-my-suffix/:id/delete',
        component: UserPortfolioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.userPortfolio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
