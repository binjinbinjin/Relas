import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { ChatMessageModel } from '../../chat/model/chat-message.model';
import { creatRequestOptionWithoutPaging } from '../../shared';
import { Principal } from './../../shared/auth/principal.service';

@Injectable()
/**Service for the unread chat message
 * - HTTP SERVICE
*/
export class UnreadChatMessageService {
  private resourceUrl = SERVER_API_URL + 'api/unread-chat-messages';

  constructor(private http: HttpClient, private principal: Principal) { }

  /**
   * Get all unread messages of current login user
   */
  getAllUnreadMessage(): Observable<ChatMessageModel[]> {
    return this.http.get(this.resourceUrl + '/allMessages/' + this.userLogin, {observe: 'response'}).map((response) => {
      return (response.body as ChatMessageModel[]);
    });
  }

  /**
   * Remove the unread message
   * @param id the message id (message id not unread message id)
   */
  removeUnreadMessage(id: number) {
    const option = creatRequestOptionWithoutPaging({ userLogin: this.userLogin, messageId: id });
    this.http.delete(this.resourceUrl + '/remove', {params: option});
  }

  get userId() {
    return this.principal.getUserID();
  }

  get userLogin() {
    return this.principal.getUserLogin();
  }

}
