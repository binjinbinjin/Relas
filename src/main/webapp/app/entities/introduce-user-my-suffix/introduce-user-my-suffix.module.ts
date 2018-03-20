import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    IntroduceUserMySuffixService,
    IntroduceUserMySuffixPopupService,
    IntroduceUserMySuffixComponent,
    IntroduceUserMySuffixDetailComponent,
    IntroduceUserMySuffixDialogComponent,
    IntroduceUserMySuffixPopupComponent,
    IntroduceUserMySuffixDeletePopupComponent,
    IntroduceUserMySuffixDeleteDialogComponent,
    introduceUserRoute,
    introduceUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...introduceUserRoute,
    ...introduceUserPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntroduceUserMySuffixComponent,
        IntroduceUserMySuffixDetailComponent,
        IntroduceUserMySuffixDialogComponent,
        IntroduceUserMySuffixDeleteDialogComponent,
        IntroduceUserMySuffixPopupComponent,
        IntroduceUserMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        IntroduceUserMySuffixComponent,
        IntroduceUserMySuffixDialogComponent,
        IntroduceUserMySuffixPopupComponent,
        IntroduceUserMySuffixDeleteDialogComponent,
        IntroduceUserMySuffixDeletePopupComponent,
    ],
    providers: [
        IntroduceUserMySuffixService,
        IntroduceUserMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasIntroduceUserMySuffixModule {}
