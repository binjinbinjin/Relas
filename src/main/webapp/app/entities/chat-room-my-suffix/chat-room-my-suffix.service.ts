import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChatRoomMySuffix } from './chat-room-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatRoomMySuffix>;

@Injectable()
export class ChatRoomMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/chat-rooms';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/chat-rooms';

    constructor(private http: HttpClient) { }

    create(chatRoom: ChatRoomMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chatRoom);
        return this.http.post<ChatRoomMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatRoom: ChatRoomMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chatRoom);
        return this.http.put<ChatRoomMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChatRoomMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatRoomMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatRoomMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatRoomMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ChatRoomMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatRoomMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatRoomMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatRoomMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatRoomMySuffix[]>): HttpResponse<ChatRoomMySuffix[]> {
        const jsonResponse: ChatRoomMySuffix[] = res.body;
        const body: ChatRoomMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatRoomMySuffix.
     */
    private convertItemFromServer(chatRoom: ChatRoomMySuffix): ChatRoomMySuffix {
        const copy: ChatRoomMySuffix = Object.assign({}, chatRoom);
        return copy;
    }

    /**
     * Convert a ChatRoomMySuffix to a JSON which can be sent to the server.
     */
    private convert(chatRoom: ChatRoomMySuffix): ChatRoomMySuffix {
        const copy: ChatRoomMySuffix = Object.assign({}, chatRoom);
        return copy;
    }
}
