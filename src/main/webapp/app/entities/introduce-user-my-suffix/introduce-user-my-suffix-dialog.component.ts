import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IntroduceUserMySuffix } from './introduce-user-my-suffix.model';
import { IntroduceUserMySuffixPopupService } from './introduce-user-my-suffix-popup.service';
import { IntroduceUserMySuffixService } from './introduce-user-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-introduce-user-my-suffix-dialog',
    templateUrl: './introduce-user-my-suffix-dialog.component.html'
})
export class IntroduceUserMySuffixDialogComponent implements OnInit {

    introduceUser: IntroduceUserMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private introduceUserService: IntroduceUserMySuffixService,
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
        if (this.introduceUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.introduceUserService.update(this.introduceUser));
        } else {
            this.subscribeToSaveResponse(
                this.introduceUserService.create(this.introduceUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IntroduceUserMySuffix>>) {
        result.subscribe((res: HttpResponse<IntroduceUserMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IntroduceUserMySuffix) {
        this.eventManager.broadcast({ name: 'introduceUserListModification', content: 'OK'});
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
    selector: 'jhi-introduce-user-my-suffix-popup',
    template: ''
})
export class IntroduceUserMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private introduceUserPopupService: IntroduceUserMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.introduceUserPopupService
                    .open(IntroduceUserMySuffixDialogComponent as Component, params['id']);
            } else {
                this.introduceUserPopupService
                    .open(IntroduceUserMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
