import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    UserPortfolioMySuffixService,
    UserPortfolioMySuffixPopupService,
    UserPortfolioMySuffixComponent,
    UserPortfolioMySuffixDetailComponent,
    UserPortfolioMySuffixDialogComponent,
    UserPortfolioMySuffixPopupComponent,
    UserPortfolioMySuffixDeletePopupComponent,
    UserPortfolioMySuffixDeleteDialogComponent,
    userPortfolioRoute,
    userPortfolioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userPortfolioRoute,
    ...userPortfolioPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserPortfolioMySuffixComponent,
        UserPortfolioMySuffixDetailComponent,
        UserPortfolioMySuffixDialogComponent,
        UserPortfolioMySuffixDeleteDialogComponent,
        UserPortfolioMySuffixPopupComponent,
        UserPortfolioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UserPortfolioMySuffixComponent,
        UserPortfolioMySuffixDialogComponent,
        UserPortfolioMySuffixPopupComponent,
        UserPortfolioMySuffixDeleteDialogComponent,
        UserPortfolioMySuffixDeletePopupComponent,
    ],
    providers: [
        UserPortfolioMySuffixService,
        UserPortfolioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasUserPortfolioMySuffixModule {}
