import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserPortfolioService } from '../../user-portfolio-service/user-portfolio.service';
import { UserPortfolio, gender } from '../../user-portfolio.model';
import { PortfolioSearchOption } from '../search-util';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: []
})

/***Search bar for user portfolio search */
export class SearchBarComponent implements OnInit {
  @Output('searchResult') result: EventEmitter<PortfolioSearchOption>;
  userGender;
  constructor(private userPortfolioService: UserPortfolioService) {
    this.result = new EventEmitter();
    this.userGender = gender;
   }

  ngOnInit() {
  }

  /**emit the seach request */
  onSubmit(form: NgForm) {
    const value = form.value;
    if (value.searchOption === 'gender') {
      this.result.emit({useLogin: false, value: value.gender});
      return;
    }
    this.result.emit({useLogin: true, value: value.search});
  }

}
