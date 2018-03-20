import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UnreadChatMessageMySuffix } from './unread-chat-message-my-suffix.model';
import { UnreadChatMessageMySuffixPopupService } from './unread-chat-message-my-suffix-popup.service';
import { UnreadChatMessageMySuffixService } from './unread-chat-message-my-suffix.service';
import { ChatMessageMySuffix, ChatMessageMySuffixService } from '../chat-message-my-suffix';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-unread-chat-message-my-suffix-dialog',
    templateUrl: './unread-chat-message-my-suffix-dialog.component.html'
})
export class UnreadChatMessageMySuffixDialogComponent implements OnInit {

    unreadChatMessage: UnreadChatMessageMySuffix;
    isSaving: boolean;

    chatmessages: ChatMessageMySuffix[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private unreadChatMessageService: UnreadChatMessageMySuffixService,
        private chatMessageService: ChatMessageMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.chatMessageService.query()
            .subscribe((res: HttpResponse<ChatMessageMySuffix[]>) => { this.chatmessages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.unreadChatMessage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.unreadChatMessageService.update(this.unreadChatMessage));
        } else {
            this.subscribeToSaveResponse(
                this.unreadChatMessageService.create(this.unreadChatMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UnreadChatMessageMySuffix>>) {
        result.subscribe((res: HttpResponse<UnreadChatMessageMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UnreadChatMessageMySuffix) {
        this.eventManager.broadcast({ name: 'unreadChatMessageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackChatMessageById(index: number, item: ChatMessageMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-unread-chat-message-my-suffix-popup',
    template: ''
})
export class UnreadChatMessageMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unreadChatMessagePopupService: UnreadChatMessageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.unreadChatMessagePopupService
                    .open(UnreadChatMessageMySuffixDialogComponent as Component, params['id']);
            } else {
                this.unreadChatMessagePopupService
                    .open(UnreadChatMessageMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
