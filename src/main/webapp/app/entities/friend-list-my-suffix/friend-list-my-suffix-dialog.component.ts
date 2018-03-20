import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FriendListMySuffix } from './friend-list-my-suffix.model';
import { FriendListMySuffixPopupService } from './friend-list-my-suffix-popup.service';
import { FriendListMySuffixService } from './friend-list-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-friend-list-my-suffix-dialog',
    templateUrl: './friend-list-my-suffix-dialog.component.html'
})
export class FriendListMySuffixDialogComponent implements OnInit {

    friendList: FriendListMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private friendListService: FriendListMySuffixService,
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
        if (this.friendList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.friendListService.update(this.friendList));
        } else {
            this.subscribeToSaveResponse(
                this.friendListService.create(this.friendList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FriendListMySuffix>>) {
        result.subscribe((res: HttpResponse<FriendListMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FriendListMySuffix) {
        this.eventManager.broadcast({ name: 'friendListListModification', content: 'OK'});
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
    selector: 'jhi-friend-list-my-suffix-popup',
    template: ''
})
export class FriendListMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private friendListPopupService: FriendListMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.friendListPopupService
                    .open(FriendListMySuffixDialogComponent as Component, params['id']);
            } else {
                this.friendListPopupService
                    .open(FriendListMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
