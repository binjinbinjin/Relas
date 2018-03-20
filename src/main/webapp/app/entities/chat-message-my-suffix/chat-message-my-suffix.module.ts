import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    ChatMessageMySuffixService,
    ChatMessageMySuffixPopupService,
    ChatMessageMySuffixComponent,
    ChatMessageMySuffixDetailComponent,
    ChatMessageMySuffixDialogComponent,
    ChatMessageMySuffixPopupComponent,
    ChatMessageMySuffixDeletePopupComponent,
    ChatMessageMySuffixDeleteDialogComponent,
    chatMessageRoute,
    chatMessagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...chatMessageRoute,
    ...chatMessagePopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatMessageMySuffixComponent,
        ChatMessageMySuffixDetailComponent,
        ChatMessageMySuffixDialogComponent,
        ChatMessageMySuffixDeleteDialogComponent,
        ChatMessageMySuffixPopupComponent,
        ChatMessageMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ChatMessageMySuffixComponent,
        ChatMessageMySuffixDialogComponent,
        ChatMessageMySuffixPopupComponent,
        ChatMessageMySuffixDeleteDialogComponent,
        ChatMessageMySuffixDeletePopupComponent,
    ],
    providers: [
        ChatMessageMySuffixService,
        ChatMessageMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasChatMessageMySuffixModule {}
