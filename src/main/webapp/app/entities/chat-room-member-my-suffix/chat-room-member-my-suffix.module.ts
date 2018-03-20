import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    ChatRoomMemberMySuffixService,
    ChatRoomMemberMySuffixPopupService,
    ChatRoomMemberMySuffixComponent,
    ChatRoomMemberMySuffixDetailComponent,
    ChatRoomMemberMySuffixDialogComponent,
    ChatRoomMemberMySuffixPopupComponent,
    ChatRoomMemberMySuffixDeletePopupComponent,
    ChatRoomMemberMySuffixDeleteDialogComponent,
    chatRoomMemberRoute,
    chatRoomMemberPopupRoute,
} from './';

const ENTITY_STATES = [
    ...chatRoomMemberRoute,
    ...chatRoomMemberPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatRoomMemberMySuffixComponent,
        ChatRoomMemberMySuffixDetailComponent,
        ChatRoomMemberMySuffixDialogComponent,
        ChatRoomMemberMySuffixDeleteDialogComponent,
        ChatRoomMemberMySuffixPopupComponent,
        ChatRoomMemberMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ChatRoomMemberMySuffixComponent,
        ChatRoomMemberMySuffixDialogComponent,
        ChatRoomMemberMySuffixPopupComponent,
        ChatRoomMemberMySuffixDeleteDialogComponent,
        ChatRoomMemberMySuffixDeletePopupComponent,
    ],
    providers: [
        ChatRoomMemberMySuffixService,
        ChatRoomMemberMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasChatRoomMemberMySuffixModule {}
