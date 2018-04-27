import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs';
import { ChatRoomDataModel, ChatMessageImageDisplayModel } from '../model/chat-room.model';
import { StoreDataInter } from '../../app-store/app-store/app.store.model';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { CHAT_THREADS } from '../../app-store/chat/chat.data';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

/**
 * The data model to keep the required data to display the
 * chat thread in chat-thread component
 */
export class ChatThreadDisplayData {
  constructor(
    public chatId: number,
    public name?: string,
    public message?: string,
    public image?: ChatMessageImageDisplayModel,
    public isRead?: boolean ) {}
}
@Component({
  selector: 'jhi-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

  /**Observe the chat threds from app store*/
  @select([CHAT_THREADS])
  chatThreads: Observable<StoreDataInter<ChatRoomDataModel>>;

  /**Login of current user, this variable will be fetch from route paramater */
  userLogin: string;

  /**A list of chat threads
   * - the last message in those chat threads is read message
   */
  chatListRead: ChatThreadDisplayData[];

  /**A list of chat threads
   * - the last message in those chat threads is unread message
   */
  chatListUnread: ChatThreadDisplayData[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  /**
   * Redirect to the chat window after user click the thread
   *
   * @param chatId chat id
   */
  clicked(chatId: number) {
    this.router.navigate(['chat/chat-windows'], { queryParams: { chatId: chatId.toString(), userName: this.userLogin}});
  }

  ngOnInit() {
    // get the userLogin from route paramater
    this.route.params.subscribe((param) => {
      this.userLogin = param['login'];
      this.subscribe();
    });
  }

  /**Subscribe the change of chat threads in app store */
  subscribe() {
    this.chatThreads.subscribe((res: StoreDataInter<ChatRoomDataModel> ) => {
      this.chatListRead = [];
      this.chatListUnread = [];

      res.payloads.forEach((each) => {
        // create a new data model
        const model = new ChatThreadDisplayData(each.chatId);
        let image: ChatMessageImageDisplayModel;
        model.isRead = true;

        // if chat thread have a name, then display the chat thead name
        if (each.chatRoomName) {
          model.name = '';
        } else {
          /* if chat thread do not have a name, then dispaly the name of users in chat thread,
           * except the current login user
           */
          let name = '';
          each.members.forEach((member) => {
            if (member.login !== this.userLogin)
              name += member.displayName + ' ';
            else {
            /**Save the current login user's image to image as default value,
             * if this chat room do not contain any message this image will be dispaly
             * otherwise the image of last message sender will be display
            */
              image = new ChatMessageImageDisplayModel(member.image, member.imageContentType);
            }
          });
          model.name = name;
        }

        if (each.messages.length < 1)
          model.message = '';
        else {
          // get the last message and message sender's image
          const index = each.messages.length - 1;
          const lastMessage = each.messages[index];
          model.message = lastMessage.message;
          image = new ChatMessageImageDisplayModel(lastMessage.image, lastMessage.imageType);
          if (lastMessage.sendInMessage && !lastMessage.isRead)
            model.isRead = false;
        }
        model.image = image;

        if (model.isRead)
          this.chatListRead.push(model);
        else
          this.chatListUnread.push(model);
      });
    });
  }

}
