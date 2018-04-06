import { UtilsModule } from './../utils/utils.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageDispalyComponent } from './chat-window/message-dispaly/message-dispaly.component';
import { EachMessageComponent } from './chat-window/each-message/each-message.component';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule
  ],
  declarations: [ChatWindowComponent, MessageDispalyComponent, EachMessageComponent],
  exports: [ChatWindowComponent]
})
export class ChatModule { }
