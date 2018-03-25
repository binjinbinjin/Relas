import { UserIDAndLogin } from './../../../shared/userID-userLogin-model';
import { ProfileService } from './../../../layouts/profiles/profile.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserPortfolio } from '../../user-portfolio.model';

@Component({
  selector: 'app-search-result-display',
  templateUrl: './search-result-display.component.html',
  styles: []
})
/**Display the search result of user porfolio */
export class SearchResultDisplayComponent  {

  /**Result to display */
  @Input('userPortfolioss') userPortfolios: UserPortfolio[];
  /**Filp page if result if pagable */
  @Output('flipPage') flipPage: EventEmitter<number>;
  /**Click user portfolio */
  @Output('clickUser') clikeUser: EventEmitter<UserIDAndLogin>;
  /**Page number; (if page < 0 that means current result is not pagable) */
  @Input('page') page: number;
  /**Symbol of >> */
  nextTag: String;
  /**Symbol of << */
  prevTag: String;
  constructor() {
    this.userPortfolios = [];
    this.page = -1;
    this.nextTag = '>>';
    this.prevTag = '<<';
    this.flipPage = new EventEmitter();
    this.clikeUser = new EventEmitter();
  }

  /**Open the image for user portfolio */
  openImage(type: string, data: string) {
    const openWindow = window.open();
    const fileUrl = 'data:' + type + ';base64,' + data;
    openWindow.document.write('<iframe src="' + fileUrl + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }

  /**Flip to Next page */
  nextPage() {
    this.page++;
    this.emitPage();
  }

  /**Flip to previous page */
  prevPage() {
    this.page--;
    this.emitPage();
  }

  /**Click user portfolilo*/
  clickPortfolio(userID: number, userLogin: string) {
    this.clikeUser.emit({id: userID, login: userLogin});
  }

  /**Emmit the page change */
  private emitPage() {
    this.flipPage.emit(this.page);
  }
}
