import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IntroduceUserMySuffix } from './introduce-user-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IntroduceUserMySuffix>;

@Injectable()
export class IntroduceUserMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/introduce-users';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/introduce-users';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(introduceUser: IntroduceUserMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(introduceUser);
        return this.http.post<IntroduceUserMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(introduceUser: IntroduceUserMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(introduceUser);
        return this.http.put<IntroduceUserMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IntroduceUserMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IntroduceUserMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<IntroduceUserMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IntroduceUserMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<IntroduceUserMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<IntroduceUserMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IntroduceUserMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IntroduceUserMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IntroduceUserMySuffix[]>): HttpResponse<IntroduceUserMySuffix[]> {
        const jsonResponse: IntroduceUserMySuffix[] = res.body;
        const body: IntroduceUserMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IntroduceUserMySuffix.
     */
    private convertItemFromServer(introduceUser: IntroduceUserMySuffix): IntroduceUserMySuffix {
        const copy: IntroduceUserMySuffix = Object.assign({}, introduceUser);
        copy.time = this.dateUtils
            .convertDateTimeFromServer(introduceUser.time);
        return copy;
    }

    /**
     * Convert a IntroduceUserMySuffix to a JSON which can be sent to the server.
     */
    private convert(introduceUser: IntroduceUserMySuffix): IntroduceUserMySuffix {
        const copy: IntroduceUserMySuffix = Object.assign({}, introduceUser);

        copy.time = this.dateUtils.toDate(introduceUser.time);
        return copy;
    }
}
