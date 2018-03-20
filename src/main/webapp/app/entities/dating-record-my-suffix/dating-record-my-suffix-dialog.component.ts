import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DatingRecordMySuffix } from './dating-record-my-suffix.model';
import { DatingRecordMySuffixPopupService } from './dating-record-my-suffix-popup.service';
import { DatingRecordMySuffixService } from './dating-record-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-dating-record-my-suffix-dialog',
    templateUrl: './dating-record-my-suffix-dialog.component.html'
})
export class DatingRecordMySuffixDialogComponent implements OnInit {

    datingRecord: DatingRecordMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datingRecordService: DatingRecordMySuffixService,
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
        if (this.datingRecord.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datingRecordService.update(this.datingRecord));
        } else {
            this.subscribeToSaveResponse(
                this.datingRecordService.create(this.datingRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DatingRecordMySuffix>>) {
        result.subscribe((res: HttpResponse<DatingRecordMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DatingRecordMySuffix) {
        this.eventManager.broadcast({ name: 'datingRecordListModification', content: 'OK'});
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
    selector: 'jhi-dating-record-my-suffix-popup',
    template: ''
})
export class DatingRecordMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datingRecordPopupService: DatingRecordMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datingRecordPopupService
                    .open(DatingRecordMySuffixDialogComponent as Component, params['id']);
            } else {
                this.datingRecordPopupService
                    .open(DatingRecordMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
