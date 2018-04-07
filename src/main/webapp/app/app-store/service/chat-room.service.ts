import { ChatRoomModel } from './../../chat/model/chat-room.model';
import { Observable } from 'rxjs/Rx';
import { Principal } from './../../shared/auth/principal.service';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class ChatRoomService {
  private resourceUrl = SERVER_API_URL + 'api/user-portfolios';
  constructor(private http: HttpClient, private principal: Principal) { }

  newTwoPersonChatRoom(): Observable<HttpResponse<ChatRoomModel>> {
    this.http.post()
  }
}
