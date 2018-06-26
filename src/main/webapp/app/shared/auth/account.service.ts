import { AccountIDUsername } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

/**Account id and user name */
export interface AccountIDUsername {
    id: number;
    username: string;
}
@Injectable()
export class AccountService  {
    constructor(private http: HttpClient) { }

    get(): Observable<HttpResponse<any>> {
        return this.http.get<any>(SERVER_API_URL + 'api/account', {observe : 'response'});
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'api/account', account, {observe: 'response'});
    }

    /** Get account id and user name */
    async getAccountKey(): Promise<AccountIDUsername> {
        let info: AccountIDUsername;
        await this.get().toPromise().then((response) => {
            const account = response.body;
            if (account) {
               info = {id: response.body.id, username: response.body.login };
            }
        });
        return info;
    }
}
