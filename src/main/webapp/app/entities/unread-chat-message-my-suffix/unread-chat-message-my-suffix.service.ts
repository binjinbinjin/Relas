import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UnreadChatMessageMySuffix } from './unread-chat-message-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UnreadChatMessageMySuffix>;

@Injectable()
export class UnreadChatMessageMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/unread-chat-messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/unread-chat-messages';

    constructor(private http: HttpClient) { }

    create(unreadChatMessage: UnreadChatMessageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(unreadChatMessage);
        return this.http.post<UnreadChatMessageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(unreadChatMessage: UnreadChatMessageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(unreadChatMessage);
        return this.http.put<UnreadChatMessageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UnreadChatMessageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UnreadChatMessageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UnreadChatMessageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UnreadChatMessageMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<UnreadChatMessageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UnreadChatMessageMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UnreadChatMessageMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UnreadChatMessageMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UnreadChatMessageMySuffix[]>): HttpResponse<UnreadChatMessageMySuffix[]> {
        const jsonResponse: UnreadChatMessageMySuffix[] = res.body;
        const body: UnreadChatMessageMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UnreadChatMessageMySuffix.
     */
    private convertItemFromServer(unreadChatMessage: UnreadChatMessageMySuffix): UnreadChatMessageMySuffix {
        const copy: UnreadChatMessageMySuffix = Object.assign({}, unreadChatMessage);
        return copy;
    }

    /**
     * Convert a UnreadChatMessageMySuffix to a JSON which can be sent to the server.
     */
    private convert(unreadChatMessage: UnreadChatMessageMySuffix): UnreadChatMessageMySuffix {
        const copy: UnreadChatMessageMySuffix = Object.assign({}, unreadChatMessage);
        return copy;
    }
}
