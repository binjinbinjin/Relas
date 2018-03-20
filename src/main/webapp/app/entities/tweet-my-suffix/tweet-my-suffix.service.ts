import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TweetMySuffix } from './tweet-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TweetMySuffix>;

@Injectable()
export class TweetMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tweets';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tweets';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tweet: TweetMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tweet);
        return this.http.post<TweetMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tweet: TweetMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tweet);
        return this.http.put<TweetMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TweetMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TweetMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TweetMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TweetMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TweetMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TweetMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TweetMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TweetMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TweetMySuffix[]>): HttpResponse<TweetMySuffix[]> {
        const jsonResponse: TweetMySuffix[] = res.body;
        const body: TweetMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TweetMySuffix.
     */
    private convertItemFromServer(tweet: TweetMySuffix): TweetMySuffix {
        const copy: TweetMySuffix = Object.assign({}, tweet);
        copy.time = this.dateUtils
            .convertDateTimeFromServer(tweet.time);
        return copy;
    }

    /**
     * Convert a TweetMySuffix to a JSON which can be sent to the server.
     */
    private convert(tweet: TweetMySuffix): TweetMySuffix {
        const copy: TweetMySuffix = Object.assign({}, tweet);

        copy.time = this.dateUtils.toDate(tweet.time);
        return copy;
    }
}
