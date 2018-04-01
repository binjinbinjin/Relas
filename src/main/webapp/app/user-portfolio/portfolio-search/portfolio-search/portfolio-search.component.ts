import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITEMS_PER_PAGE } from '../../../shared';
import { UserIDAndLogin } from '../../../shared/userID-userLogin-model';
import { UserPortfolioService } from '../../user-portfolio-service/user-portfolio.service';
import { gender, UserPortfolio } from '../../user-portfolio.model';
import { PortfolioSearchOption } from '../search-util';

@Component({
  selector: 'app-portfolio-search',
  templateUrl: './portfolio-search.component.html',
  styles: []
})

/***Perform search and display the result of search for UserPortfolio */
export class PortfolioSearchComponent implements OnInit {

  /**page number of search result */
  pageNumber: number;

  /**Search result */
  result: UserPortfolio[];

  /**Show search bar, display the search bar or not, initial to true */
  @Input('showSearchBar') showSearchBar: boolean;

  /**Click user portfolio */
  @Output('clickUser') clikeUser: EventEmitter<UserIDAndLogin>;

  /**record of the value of last gender search */
  reqGenderHistory: gender;
  constructor(private userPortfolioService: UserPortfolioService) {
    this.result = [];
    this.pageNumber = -1;
    this.showSearchBar = true;
    this.clikeUser = new EventEmitter();
   }

  ngOnInit() {
  }

  /***Search the user portfolio by user request */
  search(req: PortfolioSearchOption) {
    if (!req.useLogin) {
      this.reqGenderHistory = (req.value as gender);
      this.pageNumber = 0;
      this.getPortfoliosByGender((req.value as gender));
      return;
    }

    this.pageNumber = -1;
    this.getPortfoliosByLogin((req.value as string));
  }

  /**Changes the search result of gender by page number
   * (To enable the function, reqGenderHistory is required, that means user must performed search by
   * gender at least once, then user can request a search page change)
   */
  pageGenderChange(page: number) {
    if (!this.reqGenderHistory)
      return;
    this.pageNumber = page;
    this.getPortfoliosByGender(this.reqGenderHistory);
  }

  /**Get the users porfolios by gender */
  private getPortfoliosByGender(searchGender: gender) {
    this.userPortfolioService.getPortfolioByGender({ gender: searchGender, ...this.page }).toPromise().then((response) => {
      this.result = response.body;
      if (this.result.length === 0) {
        this.pageGenderChange(this.pageNumber - 1);

      }
    });
  }

  /**Get user portfolio by user login */
  private getPortfoliosByLogin(login: string) {
    this.userPortfolioService.fetchPortfolioByLogin(login).toPromise().then((response) => {
      this.result = [];
      if (response.ok) {
        this.result.push(response.body);
      }
    }).catch((error) => {
      this.result = [];
    });
  }

  /**Generate pagination info for search */
  get page() {
    return { page: this.pageNumber, size: ITEMS_PER_PAGE, sort: ['id', 'asc'] };
  }

  /**Click user portfolilo*/
  clickPortfolio(user: UserIDAndLogin) {
    this.clikeUser.emit(user);
  }

  /**Preform a search */
  @Input('search') set newSearch(req: PortfolioSearchOption) {
    this.search(req);
  }
}
