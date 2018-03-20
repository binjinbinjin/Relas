import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ChatMessageMySuffix } from './chat-message-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatMessageMySuffix>;

@Injectable()
export class ChatMessageMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/chat-messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/chat-messages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(chatMessage: ChatMessageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chatMessage);
        return this.http.post<ChatMessageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatMessage: ChatMessageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chatMessage);
        return this.http.put<ChatMessageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChatMessageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatMessageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatMessageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatMessageMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ChatMessageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatMessageMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatMessageMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatMessageMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatMessageMySuffix[]>): HttpResponse<ChatMessageMySuffix[]> {
        const jsonResponse: ChatMessageMySuffix[] = res.body;
        const body: ChatMessageMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatMessageMySuffix.
     */
    private convertItemFromServer(chatMessage: ChatMessageMySuffix): ChatMessageMySuffix {
        const copy: ChatMessageMySuffix = Object.assign({}, chatMessage);
        copy.time = this.dateUtils
            .convertDateTimeFromServer(chatMessage.time);
        return copy;
    }

    /**
     * Convert a ChatMessageMySuffix to a JSON which can be sent to the server.
     */
    private convert(chatMessage: ChatMessageMySuffix): ChatMessageMySuffix {
        const copy: ChatMessageMySuffix = Object.assign({}, chatMessage);

        copy.time = this.dateUtils.toDate(chatMessage.time);
        return copy;
    }
}
