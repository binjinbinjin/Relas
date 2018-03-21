import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserPortfolioMySuffix } from './user-portfolio-my-suffix.model';
import { UserPortfolioMySuffixService } from './user-portfolio-my-suffix.service';

@Injectable()
export class UserPortfolioMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userPortfolioService: UserPortfolioMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.userPortfolioService.find(id)
                    .subscribe((userPortfolioResponse: HttpResponse<UserPortfolioMySuffix>) => {
                        const userPortfolio: UserPortfolioMySuffix = userPortfolioResponse.body;
                        this.ngbModalRef = this.userPortfolioModalRef(component, userPortfolio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userPortfolioModalRef(component, new UserPortfolioMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userPortfolioModalRef(component: Component, userPortfolio: UserPortfolioMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userPortfolio = userPortfolio;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
