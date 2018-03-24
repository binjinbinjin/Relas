import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserPortfolio, gender } from '../user-portfolio.model';
import { JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'app-portfolio-change-form',
  templateUrl: './portfolio-change-form.component.html',
  styles: []
})
/**This is the form use for portforlio change */
export class PortfolioChangeFormComponent {

  /**Input the old portfolio */
  @Input('portfolio') portfolio: UserPortfolio;
  /**Emmit the new portfolio */
  @Output('portfolioChange') change: EventEmitter<any>;
  /**Gender */
  userGender;

  constructor(private dataUtils: JhiDataUtils) {
    this.userGender = gender;
    this.change = new EventEmitter();
   }

  /**Get image file from user */
  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  /**Submit the change */
  submitForm() {
    this.change.emit(this.portfolio);
  }

}
