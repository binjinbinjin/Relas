import { Component, Input } from '@angular/core';

import { ChatMessage } from '../../model/chat-message.model';

@Component({
  selector: 'app-each-message',
  templateUrl: './each-message.component.html',
  styleUrls: ['each-message.component.css']
})
/**This component is use to display the message */
export class EachMessageComponent {

  /**The message to display */
  @Input('message') message: ChatMessage;
  constructor() {
    this.message = null;
  }

}
