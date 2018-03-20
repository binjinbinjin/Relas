import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import {
    ChatRoomMySuffixService,
    ChatRoomMySuffixPopupService,
    ChatRoomMySuffixComponent,
    ChatRoomMySuffixDetailComponent,
    ChatRoomMySuffixDialogComponent,
    ChatRoomMySuffixPopupComponent,
    ChatRoomMySuffixDeletePopupComponent,
    ChatRoomMySuffixDeleteDialogComponent,
    chatRoomRoute,
    chatRoomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...chatRoomRoute,
    ...chatRoomPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatRoomMySuffixComponent,
        ChatRoomMySuffixDetailComponent,
        ChatRoomMySuffixDialogComponent,
        ChatRoomMySuffixDeleteDialogComponent,
        ChatRoomMySuffixPopupComponent,
        ChatRoomMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ChatRoomMySuffixComponent,
        ChatRoomMySuffixDialogComponent,
        ChatRoomMySuffixPopupComponent,
        ChatRoomMySuffixDeleteDialogComponent,
        ChatRoomMySuffixDeletePopupComponent,
    ],
    providers: [
        ChatRoomMySuffixService,
        ChatRoomMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasChatRoomMySuffixModule {}
