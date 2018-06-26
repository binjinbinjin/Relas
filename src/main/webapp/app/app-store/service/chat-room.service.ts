
import {map} from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Rx';

import { SERVER_API_URL } from '../../app.constants';
import { ChatRoomMemberModel } from '../../chat/model/chat-room-member.model';
import { ChatRoomsAndMembersModel } from '../../chat/model/chat-room.model';
import { Principal } from '../../shared/auth/principal.service';
import { ChatRoomModel } from './../../chat/model/chat-room.model';

@Injectable()
/**Service about chat room  and chat room members
 *  - HTTP SERVICE
 */
export class ChatRoomService {
  private loginChangeListener: Observable<ChatRoomsAndMembersModel[]>;
  private loginChangeListenerObserver: Observer<ChatRoomsAndMembersModel[]>;
  private chatRoomUrl = SERVER_API_URL + 'api/chat-rooms';
  private chatRoomMember = SERVER_API_URL + 'api/chat-room-members';

  constructor(private http: HttpClient, private principal: Principal) {
    this.loginChangeListener = this.createLoginChangeListener();
    this.loginChangeSubscribe();
   }

   /**Create a new two person chat room */
  newTwoPersonChatRoom(): Observable<ChatRoomModel> {
    const chat = this.twoPersonChatRoom();
    return this.http.post(this.chatRoomUrl, chat, {observe: 'response'}).pipe(map( (response) => {
      return response.body;
    }));
  }

  /**Fetch all chat room id for current login user
   * - error will error if user is not login
   */
  fetchAllChatRoomChatId(): Observable<number[]> {
    return this.http.get(this.chatRoomMember + '/chat_ids/' + this.userLogin, {observe: 'response'}).pipe(map((response) => {
      return (response.body as number[]);
    }));
  }

  /**
   * Get a list of members of specified chat room
   * @param chatID chat room id
   */
  fetchChatRoomMembersByChatId(chatID: number): Observable<ChatRoomMemberModel[]> {
    return this.http.get(this.chatRoomMember + '/allMembers/' + chatID, {observe: 'response'}).pipe(map((response) => {
      return (response.body as ChatRoomMemberModel[]);
    }));
  }

  /**Fetch all members of chat rooms of cureent login user
   */
  fetchChatRoomsAndMembers(): Observable<ChatRoomsAndMembersModel []>  {
    return this.http.get(this.chatRoomMember + '/membersOfChatRooms/' + this.userLogin, { observe: 'response' }).pipe(map((response: HttpResponse<ChatRoomsAndMembersModel[]>) => {
      return response.body;
    }));
  }

  /**Listener to get the members of chat rooms of cureent login user
   * - A new data will be send iff when current login user is changed
  */
  getChatRoomsAndMembersWhenLoginChange(): Observable<ChatRoomsAndMembersModel[]> {
    return this.loginChangeListener;
  }

  private createLoginChangeListener(): Observable<ChatRoomsAndMembersModel[]> {
    return new Observable((observer) => {
      this.loginChangeListenerObserver = observer;
    });
  }

  private fetchChatRoomsAndMembersSubscriber() {
    this.fetchChatRoomsAndMembers().toPromise().then((res: ChatRoomsAndMembersModel[] ) => {
      this.loginChangeListenerObserver.next(res);
    });
    // this.fetchChatRoomsAndMembers().subscribe((res: ChatRoomsAndMembersModel[]) => {
    //   this.loginChangeListenerObserver.next(res);
    // });
  }

  private loginChangeSubscribe() {
    this.principal.getAuthenticationState().subscribe((res) => {
      if (this.userLogin) {
        this.fetchChatRoomsAndMembersSubscriber();
      }
    });
  }

  get userLogin() {
    const login = this.principal.getUserLogin();
    return login;
  }

  private twoPersonChatRoom(): ChatRoomModel {
    const chat = new ChatRoomModel();
    chat.maxMember = 2;
    return chat;
  }

}
