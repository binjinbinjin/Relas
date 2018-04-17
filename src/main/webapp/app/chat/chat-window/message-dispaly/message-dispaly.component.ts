import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatMessage } from '../../model/chat-message.model';

@Component({
  selector: 'app-message-dispaly',
  templateUrl: './message-dispaly.component.html',
  styleUrls: ['message-display.component.css']
})
/**Component for display messages */
export class MessageDispalyComponent implements OnInit, AfterViewChecked {
  /**Get the child call scrollMe */
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  /**The messages to display */
  @Input() messages: ChatMessage[];
  constructor() {
    this.messages = [];
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  /**Dispaly the last message */
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
