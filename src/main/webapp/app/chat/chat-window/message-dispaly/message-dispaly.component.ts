import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../model/chat-message.model';

@Component({
  selector: 'app-message-dispaly',
  templateUrl: './message-dispaly.component.html',
  styleUrls: ['message-display.component.css']
})
export class MessageDispalyComponent implements OnInit {

  @Input() messages: ChatMessage[];
  constructor() {
    this.messages = [];
  }
  ngOnInit() {
  }
}
