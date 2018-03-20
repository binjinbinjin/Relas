import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TweetMySuffix } from './tweet-my-suffix.model';
import { TweetMySuffixPopupService } from './tweet-my-suffix-popup.service';
import { TweetMySuffixService } from './tweet-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-tweet-my-suffix-dialog',
    templateUrl: './tweet-my-suffix-dialog.component.html'
})
export class TweetMySuffixDialogComponent implements OnInit {

    tweet: TweetMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private tweetService: TweetMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tweet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tweetService.update(this.tweet));
        } else {
            this.subscribeToSaveResponse(
                this.tweetService.create(this.tweet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TweetMySuffix>>) {
        result.subscribe((res: HttpResponse<TweetMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TweetMySuffix) {
        this.eventManager.broadcast({ name: 'tweetListModification', content: 'OK'});
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
    selector: 'jhi-tweet-my-suffix-popup',
    template: ''
})
export class TweetMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tweetPopupService: TweetMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tweetPopupService
                    .open(TweetMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tweetPopupService
                    .open(TweetMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
