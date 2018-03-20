import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    FriendListMySuffixService,
    FriendListMySuffixPopupService,
    FriendListMySuffixComponent,
    FriendListMySuffixDetailComponent,
    FriendListMySuffixDialogComponent,
    FriendListMySuffixPopupComponent,
    FriendListMySuffixDeletePopupComponent,
    FriendListMySuffixDeleteDialogComponent,
    friendListRoute,
    friendListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...friendListRoute,
    ...friendListPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FriendListMySuffixComponent,
        FriendListMySuffixDetailComponent,
        FriendListMySuffixDialogComponent,
        FriendListMySuffixDeleteDialogComponent,
        FriendListMySuffixPopupComponent,
        FriendListMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FriendListMySuffixComponent,
        FriendListMySuffixDialogComponent,
        FriendListMySuffixPopupComponent,
        FriendListMySuffixDeleteDialogComponent,
        FriendListMySuffixDeletePopupComponent,
    ],
    providers: [
        FriendListMySuffixService,
        FriendListMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasFriendListMySuffixModule {}
