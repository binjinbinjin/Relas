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

  @select([CHAT_THREADS])
  chatThreads: Observable<StoreDataInter<ChatRoomDataModel>>;

  userLogin: string;

  chatListRead: ChatThreadDisplayData[];

  chatListUnread: ChatThreadDisplayData[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  clicked(chatId: number) {
    this.router.navigate(['chat/chat-windows'], { queryParams: { chatId: chatId.toString()}});
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.userLogin = param['login'];
      this.subscribe();
    });
  }

  subscribe() {
    this.chatThreads.subscribe((res: StoreDataInter<ChatRoomDataModel> ) => {
      this.chatListRead = [];
      this.chatListUnread = [];
      res.payloads.forEach((each) => {
        const model = new ChatThreadDisplayData(each.chatId);
        let image: ChatMessageImageDisplayModel;
        model.isRead = true;
        if (each.chatRoomName) {
          model.name = '';
        } else {
          let name = '';
          each.members.forEach((member) => {
            if (member.login !== this.userLogin)
              name += member.displayName + ' ';
            else
              image = new ChatMessageImageDisplayModel(member.image, member.imageContentType);
          });
          model.name = name;
        }
        if (each.messages.length < 1)
          model.message = '';
        else {
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
