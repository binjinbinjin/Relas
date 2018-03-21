import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RelasFriendListMySuffixModule } from './friend-list-my-suffix/friend-list-my-suffix.module';
import { RelasChatRoomMySuffixModule } from './chat-room-my-suffix/chat-room-my-suffix.module';
import { RelasChatRoomMemberMySuffixModule } from './chat-room-member-my-suffix/chat-room-member-my-suffix.module';
import { RelasChatMessageMySuffixModule } from './chat-message-my-suffix/chat-message-my-suffix.module';
import { RelasUnreadChatMessageMySuffixModule } from './unread-chat-message-my-suffix/unread-chat-message-my-suffix.module';
import { RelasDatingRecordMySuffixModule } from './dating-record-my-suffix/dating-record-my-suffix.module';
import { RelasIntroduceUserMySuffixModule } from './introduce-user-my-suffix/introduce-user-my-suffix.module';
import { RelasTweetMySuffixModule } from './tweet-my-suffix/tweet-my-suffix.module';
import { RelasUserPortfolioMySuffixModule } from './user-portfolio-my-suffix/user-portfolio-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RelasFriendListMySuffixModule,
        RelasChatRoomMySuffixModule,
        RelasChatRoomMemberMySuffixModule,
        RelasChatMessageMySuffixModule,
        RelasUnreadChatMessageMySuffixModule,
        RelasDatingRecordMySuffixModule,
        RelasIntroduceUserMySuffixModule,
        RelasTweetMySuffixModule,
        RelasUserPortfolioMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasEntityModule {}
