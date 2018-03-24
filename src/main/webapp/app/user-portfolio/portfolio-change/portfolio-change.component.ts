import { Component, OnInit } from '@angular/core';
import { UserPortfolioService } from '../user-portfolio-service/user-portfolio.service';
import { UserPortfolio } from '../user-portfolio.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portfolio-change',
  templateUrl: './portfolio-change.component.html',
  styles: []
})

/**This component is use to change and update the user portfolio */
export class PortfolioChangeComponent implements OnInit {

  /**Use the record the reference of open modal*/
  modalRef: NgbModalRef;
  /**Array of user portfolio, it will be either empty or contain on element */
  portfolio: UserPortfolio[];
  /**user portfolio */
  userPortfolio: UserPortfolio;
  constructor(
    private userPortfolioService: UserPortfolioService,
    private modalService: NgbModal) {
    this.portfolio = [];
  }

  /**Update the user portfolio by paramater portfolio */
  changePortfolio(portfolio: UserPortfolio) {
    this.closeModal();
    this.userPortfolioService.updatePortfolio(portfolio).toPromise().then((response) => {
      this.portfolio = [];
      this.portfolio.push(response.body);
      this.userPortfolio = {...response.body};
    });
  }

  /**Fetch the user portfolio ater component have been created */
  ngOnInit() {
    this.userPortfolioService.fetchPortfolio().toPromise().then((response) => {
      this.portfolio.push(response.body);
      this.userPortfolio = { ...response.body};
    });
  }

  /**Open the portfolio change form */
  openModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  /**Close the portfolio change form */
  closeModal() {
    if (!this.modalRef)
      return;
    this.modalRef.close();
  }
}
