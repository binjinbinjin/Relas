import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChatRoomMemberMySuffix } from './chat-room-member-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatRoomMemberMySuffix>;

@Injectable()
export class ChatRoomMemberMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/chat-room-members';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/chat-room-members';

    constructor(private http: HttpClient) { }

    create(chatRoomMember: ChatRoomMemberMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chatRoomMember);
        return this.http.post<ChatRoomMemberMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatRoomMember: ChatRoomMemberMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chatRoomMember);
        return this.http.put<ChatRoomMemberMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChatRoomMemberMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatRoomMemberMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatRoomMemberMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatRoomMemberMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ChatRoomMemberMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatRoomMemberMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatRoomMemberMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatRoomMemberMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatRoomMemberMySuffix[]>): HttpResponse<ChatRoomMemberMySuffix[]> {
        const jsonResponse: ChatRoomMemberMySuffix[] = res.body;
        const body: ChatRoomMemberMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatRoomMemberMySuffix.
     */
    private convertItemFromServer(chatRoomMember: ChatRoomMemberMySuffix): ChatRoomMemberMySuffix {
        const copy: ChatRoomMemberMySuffix = Object.assign({}, chatRoomMember);
        return copy;
    }

    /**
     * Convert a ChatRoomMemberMySuffix to a JSON which can be sent to the server.
     */
    private convert(chatRoomMember: ChatRoomMemberMySuffix): ChatRoomMemberMySuffix {
        const copy: ChatRoomMemberMySuffix = Object.assign({}, chatRoomMember);
        return copy;
    }
}
