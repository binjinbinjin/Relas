import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../../shared';
import { RelasAdminModule } from '../../admin/admin.module';
import {
    TweetMySuffixService,
    TweetMySuffixPopupService,
    TweetMySuffixComponent,
    TweetMySuffixDetailComponent,
    TweetMySuffixDialogComponent,
    TweetMySuffixPopupComponent,
    TweetMySuffixDeletePopupComponent,
    TweetMySuffixDeleteDialogComponent,
    tweetRoute,
    tweetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tweetRoute,
    ...tweetPopupRoute,
];

@NgModule({
    imports: [
        RelasSharedModule,
        RelasAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TweetMySuffixComponent,
        TweetMySuffixDetailComponent,
        TweetMySuffixDialogComponent,
        TweetMySuffixDeleteDialogComponent,
        TweetMySuffixPopupComponent,
        TweetMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TweetMySuffixComponent,
        TweetMySuffixDialogComponent,
        TweetMySuffixPopupComponent,
        TweetMySuffixDeleteDialogComponent,
        TweetMySuffixDeletePopupComponent,
    ],
    providers: [
        TweetMySuffixService,
        TweetMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasTweetMySuffixModule {}
