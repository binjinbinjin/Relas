import { AppStoreModule } from './../app-store/app-store.module';
import { UtilsModule } from './../utils/utils.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageDispalyComponent } from './chat-window/message-dispaly/message-dispaly.component';
import { EachMessageComponent } from './chat-window/each-message/each-message.component';
import { RouterModule } from '@angular/router';
import { chatMainRoute } from './chat-route';
import { FormsModule } from '@angular/forms';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    AppStoreModule,
    RouterModule.forChild(chatMainRoute),
    FormsModule
  ],
  declarations: [ChatWindowComponent, MessageDispalyComponent, EachMessageComponent, ChatThreadsComponent],
  exports: [ChatWindowComponent]
})
export class ChatModule { }
