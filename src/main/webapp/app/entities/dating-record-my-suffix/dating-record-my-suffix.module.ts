import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    DatingRecordMySuffixService,
    DatingRecordMySuffixPopupService,
    DatingRecordMySuffixComponent,
    DatingRecordMySuffixDetailComponent,
    DatingRecordMySuffixDialogComponent,
    DatingRecordMySuffixPopupComponent,
    DatingRecordMySuffixDeletePopupComponent,
    DatingRecordMySuffixDeleteDialogComponent,
    datingRecordRoute,
    datingRecordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...datingRecordRoute,
    ...datingRecordPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DatingRecordMySuffixComponent,
        DatingRecordMySuffixDetailComponent,
        DatingRecordMySuffixDialogComponent,
        DatingRecordMySuffixDeleteDialogComponent,
        DatingRecordMySuffixPopupComponent,
        DatingRecordMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DatingRecordMySuffixComponent,
        DatingRecordMySuffixDialogComponent,
        DatingRecordMySuffixPopupComponent,
        DatingRecordMySuffixDeleteDialogComponent,
        DatingRecordMySuffixDeletePopupComponent,
    ],
    providers: [
        DatingRecordMySuffixService,
        DatingRecordMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasDatingRecordMySuffixModule {}
