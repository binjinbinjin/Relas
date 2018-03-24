import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioSearchComponent } from './portfolio-search/portfolio-search/portfolio-search.component';
import { PortfolioChangeComponent } from './portfolio-change/portfolio-change.component';
import { SearchResultDisplayComponent } from './portfolio-search/search-result-display/search-result-display.component';
import { SearchBarComponent } from './portfolio-search/search-bar/search-bar.component';
import { UserPortfolioService } from './user-portfolio-service/user-portfolio.service';
import { RelasSharedModule } from '../shared';
import { PortfolioChangeFormComponent } from './portfolio-change-form/portfolio-change-form.component';
import { JhiDataUtils } from 'ng-jhipster';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  exports: [PortfolioSearchComponent, PortfolioChangeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RelasSharedModule,
    NgbModule
  ],
  providers: [UserPortfolioService, JhiDataUtils],
  declarations: [PortfolioSearchComponent, PortfolioChangeComponent, SearchResultDisplayComponent, SearchBarComponent, PortfolioChangeFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserPortfolioModule { }
