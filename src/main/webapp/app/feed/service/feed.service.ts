
import {map} from 'rxjs/operators';
import { FeedModel } from './../model/feed.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Principal } from '../../shared/auth/principal.service';
import { SERVER_API_URL } from '../../app.constants';
import { Observable } from 'rxjs';
import { ITEMS_PER_PAGE, createRequestOption } from '../../shared';

/**Service for feed
 *  - HTTP SERVICE
 */
@Injectable()
export class FeedService {

  private resourceUrl = SERVER_API_URL + 'api/tweets';

  constructor(private http: HttpClient, private principal: Principal) { }

  /**
   * Post a new feed
   * @param tweet
   * @returns HttpResponse<FeedModel>
   */
  create(tweet: FeedModel): Observable<HttpResponse<FeedModel>> {
    tweet.userIDId = this.principal.getUserID();
    return this.http.post<FeedModel>(this.resourceUrl, tweet, { observe: 'response' }).pipe(
      map((res: HttpResponse<FeedModel>) => {
        const body: FeedModel = Object.assign({}, res.body);
        return res.clone({body});
      }));
  }

  /**
   * Get a page feeds that were posted by user
   * @param pageNumber page number
   * @return a page of feeds
   */
  getAllTweet(pageNumber: number): Observable<HttpResponse<FeedModel[]>> | null {
    const option = createRequestOption({id: this.principal.getUserID(), ...this.getPage(pageNumber)});
    return this.http.get<FeedModel[]>(this.resourceUrl + '/getAllTweets', {params: option, observe: 'response'});
  }

    /**
   * Get a page feeds that were posted by friends
   * @param pageNumber page number
   * @return a page of feeds
   */
  getAllFriendsTweet(pageNumber: number): Observable<HttpResponse<FeedModel[]>> | null {
    const option = createRequestOption({ id: this.principal.getUserID(), ...this.getPage(pageNumber) });

    return this.http.get<FeedModel[]>(this.resourceUrl + '/getAllFriendsTweets', { params: option, observe: 'response' });
  }

  /**Generate pagination info for search */
  getPage(pageNumber: number) {
    return { page: pageNumber, size: ITEMS_PER_PAGE, sort: ['time' + ',' + 'desc'] };
  }

}
