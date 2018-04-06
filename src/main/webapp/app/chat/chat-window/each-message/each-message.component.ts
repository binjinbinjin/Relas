import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../model/chat-message.model';

@Component({
  selector: 'app-each-message',
  templateUrl: './each-message.component.html',
  styleUrls: ['each-message.component.css']
})
export class EachMessageComponent implements OnInit {

  @Input('message') message: ChatMessage;
  constructor() {
    this.message = null;
  }

  ngOnInit() {
  }

}
