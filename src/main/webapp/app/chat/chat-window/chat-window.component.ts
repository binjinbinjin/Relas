import { ChatMessageStatusEnum } from './../model/chat-message.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from '../model/chat-message.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @Output('close') close: EventEmitter<boolean>;
  message: ChatMessage[];
  open: boolean;
  constructor() {
    this.open = true;
    this.close = new EventEmitter();
    this.message = [];
  }

  click() {
   this.close.emit(true);
  }

  ngOnInit() {
  }

}
