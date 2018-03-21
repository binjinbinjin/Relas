import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserPortfolio } from './user-portfolio.model';

export type UserPortfolioServiceConnection = HttpResponse<UserPortfolio>;
@Injectable()
export class UserPortfolioService {

  private resourceUrl = SERVER_API_URL + 'api/user-portfolios';
  private resourceSearchUrl = SERVER_API_URL + 'api/_search/user-portfolios';
  constructor(private http: HttpClient) { }

  newPortfolio(portfolio: UserPortfolio): Observable<UserPortfolioServiceConnection> {
    return this.http.post<UserPortfolio>(this.resourceUrl, portfolio, {observe: 'response'});
  }

  updatePortfolio(portfolio: UserPortfolio): Observable<UserPortfolioServiceConnection>  {
    return this.http.put<UserPortfolio>(this.resourceSearchUrl, portfolio, {observe: 'response'});
  }  
}
