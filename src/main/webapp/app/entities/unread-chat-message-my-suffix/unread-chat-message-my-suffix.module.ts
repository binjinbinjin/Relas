import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    UnreadChatMessageMySuffixService,
    UnreadChatMessageMySuffixPopupService,
    UnreadChatMessageMySuffixComponent,
    UnreadChatMessageMySuffixDetailComponent,
    UnreadChatMessageMySuffixDialogComponent,
    UnreadChatMessageMySuffixPopupComponent,
    UnreadChatMessageMySuffixDeletePopupComponent,
    UnreadChatMessageMySuffixDeleteDialogComponent,
    unreadChatMessageRoute,
    unreadChatMessagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...unreadChatMessageRoute,
    ...unreadChatMessagePopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UnreadChatMessageMySuffixComponent,
        UnreadChatMessageMySuffixDetailComponent,
        UnreadChatMessageMySuffixDialogComponent,
        UnreadChatMessageMySuffixDeleteDialogComponent,
        UnreadChatMessageMySuffixPopupComponent,
        UnreadChatMessageMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UnreadChatMessageMySuffixComponent,
        UnreadChatMessageMySuffixDialogComponent,
        UnreadChatMessageMySuffixPopupComponent,
        UnreadChatMessageMySuffixDeleteDialogComponent,
        UnreadChatMessageMySuffixDeletePopupComponent,
    ],
    providers: [
        UnreadChatMessageMySuffixService,
        UnreadChatMessageMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasUnreadChatMessageMySuffixModule {}
