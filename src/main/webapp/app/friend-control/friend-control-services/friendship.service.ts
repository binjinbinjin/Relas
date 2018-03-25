import { Injectable } from '@angular/core';
import { Principal } from '../../shared';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { friendRequestReason, FriendshipRequst } from './friend-request-model';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class FriendshipService {
  private resourceUrl = SERVER_API_URL + 'api/introduce-users';

  constructor(private principalService: Principal, private http: HttpClient) { }

  /**userLogin: login of the user that you want to add
   * userID:  id of the user that you want to add
   */
  sendFriendRequest(userLogin: string, userID: number, requetReason: friendRequestReason): Observable<Boolean> {
    const selfLogin = this.principalService.getUserLogin();
    const selfID = this.principalService.getUserID();
    if (!selfLogin || selfID < 0)
      throw Error('Please login');
    const reqBody = this.createRqustObject(selfID, selfLogin, selfID, selfLogin, userID, userLogin, requetReason);
    console.log(reqBody);
    return this.http.post<FriendshipRequst>(this.resourceUrl, reqBody, { observe: 'response'}).map((response) => {
      if (response.ok)
        return true;
      return false;
    });
  }

  private createRqustObject(
    introByID: number,
    introByLogin: string,
    introToID: number,
    introToLogin: string,
    introUserID: number,
    introUserLogin: string,
    requestReason: friendRequestReason
  ): FriendshipRequst {
    return {
      time: new Date(),
      reason: requestReason,
      introduceByLogin: introByLogin,
      introduceById: introByID,
      introduceToLogin: introToLogin,
      introduceToId: introToID,
      introduceUserIDLogin: introUserLogin,
      introduceUserIDId: introUserID,
    };
  }

}
