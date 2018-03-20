import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FriendListMySuffix } from './friend-list-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FriendListMySuffix>;

@Injectable()
export class FriendListMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/friend-lists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/friend-lists';

    constructor(private http: HttpClient) { }

    create(friendList: FriendListMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(friendList);
        return this.http.post<FriendListMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(friendList: FriendListMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(friendList);
        return this.http.put<FriendListMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FriendListMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FriendListMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FriendListMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FriendListMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<FriendListMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FriendListMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FriendListMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FriendListMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FriendListMySuffix[]>): HttpResponse<FriendListMySuffix[]> {
        const jsonResponse: FriendListMySuffix[] = res.body;
        const body: FriendListMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FriendListMySuffix.
     */
    private convertItemFromServer(friendList: FriendListMySuffix): FriendListMySuffix {
        const copy: FriendListMySuffix = Object.assign({}, friendList);
        return copy;
    }

    /**
     * Convert a FriendListMySuffix to a JSON which can be sent to the server.
     */
    private convert(friendList: FriendListMySuffix): FriendListMySuffix {
        const copy: FriendListMySuffix = Object.assign({}, friendList);
        return copy;
    }
}
