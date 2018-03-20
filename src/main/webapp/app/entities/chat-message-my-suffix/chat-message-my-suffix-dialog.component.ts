import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ChatMessageMySuffix } from './chat-message-my-suffix.model';
import { ChatMessageMySuffixPopupService } from './chat-message-my-suffix-popup.service';
import { ChatMessageMySuffixService } from './chat-message-my-suffix.service';
import { ChatRoomMySuffix, ChatRoomMySuffixService } from '../chat-room-my-suffix';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-chat-message-my-suffix-dialog',
    templateUrl: './chat-message-my-suffix-dialog.component.html'
})
export class ChatMessageMySuffixDialogComponent implements OnInit {

    chatMessage: ChatMessageMySuffix;
    isSaving: boolean;

    chatrooms: ChatRoomMySuffix[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private chatMessageService: ChatMessageMySuffixService,
        private chatRoomService: ChatRoomMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.chatRoomService.query()
            .subscribe((res: HttpResponse<ChatRoomMySuffix[]>) => { this.chatrooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.chatMessage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatMessageService.update(this.chatMessage));
        } else {
            this.subscribeToSaveResponse(
                this.chatMessageService.create(this.chatMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatMessageMySuffix>>) {
        result.subscribe((res: HttpResponse<ChatMessageMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatMessageMySuffix) {
        this.eventManager.broadcast({ name: 'chatMessageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackChatRoomById(index: number, item: ChatRoomMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chat-message-my-suffix-popup',
    template: ''
})
export class ChatMessageMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessagePopupService: ChatMessageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatMessagePopupService
                    .open(ChatMessageMySuffixDialogComponent as Component, params['id']);
            } else {
                this.chatMessagePopupService
                    .open(ChatMessageMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
