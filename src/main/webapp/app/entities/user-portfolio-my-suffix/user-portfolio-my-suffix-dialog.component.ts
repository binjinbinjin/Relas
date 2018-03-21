import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserPortfolioMySuffix } from './user-portfolio-my-suffix.model';
import { UserPortfolioMySuffixPopupService } from './user-portfolio-my-suffix-popup.service';
import { UserPortfolioMySuffixService } from './user-portfolio-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-portfolio-my-suffix-dialog',
    templateUrl: './user-portfolio-my-suffix-dialog.component.html'
})
export class UserPortfolioMySuffixDialogComponent implements OnInit {

    userPortfolio: UserPortfolioMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userPortfolioService: UserPortfolioMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userPortfolio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userPortfolioService.update(this.userPortfolio));
        } else {
            this.subscribeToSaveResponse(
                this.userPortfolioService.create(this.userPortfolio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserPortfolioMySuffix>>) {
        result.subscribe((res: HttpResponse<UserPortfolioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserPortfolioMySuffix) {
        this.eventManager.broadcast({ name: 'userPortfolioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-portfolio-my-suffix-popup',
    template: ''
})
export class UserPortfolioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userPortfolioPopupService: UserPortfolioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userPortfolioPopupService
                    .open(UserPortfolioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.userPortfolioPopupService
                    .open(UserPortfolioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
