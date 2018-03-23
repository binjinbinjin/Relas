import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioSearchComponent } from './portfolio-search/portfolio-search/portfolio-search.component';
import { PortfolioChangeComponent } from './portfolio-change/portfolio-change.component';
import { SearchResultDisplayComponent } from './portfolio-search/search-result-display/search-result-display.component';
import { SearchBarComponent } from './portfolio-search/search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PortfolioSearchComponent, PortfolioChangeComponent, SearchResultDisplayComponent, SearchBarComponent]
})
export class UserPortfolioModule { }
