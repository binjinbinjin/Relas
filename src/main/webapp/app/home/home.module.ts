import { FriendControlModule } from './../friend-control/friend-control.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { ChatModule } from '../chat/chat.module';

@NgModule({
    imports: [
        RelasSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        FriendControlModule,
        ChatModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasHomeModule {}
