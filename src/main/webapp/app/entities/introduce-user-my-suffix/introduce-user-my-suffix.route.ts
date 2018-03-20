import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IntroduceUserMySuffixComponent } from './introduce-user-my-suffix.component';
import { IntroduceUserMySuffixDetailComponent } from './introduce-user-my-suffix-detail.component';
import { IntroduceUserMySuffixPopupComponent } from './introduce-user-my-suffix-dialog.component';
import { IntroduceUserMySuffixDeletePopupComponent } from './introduce-user-my-suffix-delete-dialog.component';

export const introduceUserRoute: Routes = [
    {
        path: 'introduce-user-my-suffix',
        component: IntroduceUserMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.introduceUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'introduce-user-my-suffix/:id',
        component: IntroduceUserMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.introduceUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const introduceUserPopupRoute: Routes = [
    {
        path: 'introduce-user-my-suffix-new',
        component: IntroduceUserMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.introduceUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'introduce-user-my-suffix/:id/edit',
        component: IntroduceUserMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.introduceUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'introduce-user-my-suffix/:id/delete',
        component: IntroduceUserMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.introduceUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
