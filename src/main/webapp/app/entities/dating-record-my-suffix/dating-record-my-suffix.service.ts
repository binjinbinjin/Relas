import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DatingRecordMySuffix } from './dating-record-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DatingRecordMySuffix>;

@Injectable()
export class DatingRecordMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/dating-records';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/dating-records';

    constructor(private http: HttpClient) { }

    create(datingRecord: DatingRecordMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(datingRecord);
        return this.http.post<DatingRecordMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(datingRecord: DatingRecordMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(datingRecord);
        return this.http.put<DatingRecordMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DatingRecordMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DatingRecordMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DatingRecordMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DatingRecordMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DatingRecordMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DatingRecordMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DatingRecordMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DatingRecordMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DatingRecordMySuffix[]>): HttpResponse<DatingRecordMySuffix[]> {
        const jsonResponse: DatingRecordMySuffix[] = res.body;
        const body: DatingRecordMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DatingRecordMySuffix.
     */
    private convertItemFromServer(datingRecord: DatingRecordMySuffix): DatingRecordMySuffix {
        const copy: DatingRecordMySuffix = Object.assign({}, datingRecord);
        return copy;
    }

    /**
     * Convert a DatingRecordMySuffix to a JSON which can be sent to the server.
     */
    private convert(datingRecord: DatingRecordMySuffix): DatingRecordMySuffix {
        const copy: DatingRecordMySuffix = Object.assign({}, datingRecord);
        return copy;
    }
}
