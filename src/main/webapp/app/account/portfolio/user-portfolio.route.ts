import { Route } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { UserRouteAccessService } from '../../shared';

export const portfolioRoute: Route = {
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.account.password'
    },
    canActivate: [UserRouteAccessService]
};
