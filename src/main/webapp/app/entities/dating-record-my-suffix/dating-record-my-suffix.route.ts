import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DatingRecordMySuffixComponent } from './dating-record-my-suffix.component';
import { DatingRecordMySuffixDetailComponent } from './dating-record-my-suffix-detail.component';
import { DatingRecordMySuffixPopupComponent } from './dating-record-my-suffix-dialog.component';
import { DatingRecordMySuffixDeletePopupComponent } from './dating-record-my-suffix-delete-dialog.component';

export const datingRecordRoute: Routes = [
    {
        path: 'dating-record-my-suffix',
        component: DatingRecordMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.datingRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dating-record-my-suffix/:id',
        component: DatingRecordMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.datingRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datingRecordPopupRoute: Routes = [
    {
        path: 'dating-record-my-suffix-new',
        component: DatingRecordMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.datingRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dating-record-my-suffix/:id/edit',
        component: DatingRecordMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.datingRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dating-record-my-suffix/:id/delete',
        component: DatingRecordMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'relasApp.datingRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
