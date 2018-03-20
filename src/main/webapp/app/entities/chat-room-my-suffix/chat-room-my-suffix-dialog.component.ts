import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoomMySuffix } from './chat-room-my-suffix.model';
import { ChatRoomMySuffixPopupService } from './chat-room-my-suffix-popup.service';
import { ChatRoomMySuffixService } from './chat-room-my-suffix.service';

@Component({
    selector: 'jhi-chat-room-my-suffix-dialog',
    templateUrl: './chat-room-my-suffix-dialog.component.html'
})
export class ChatRoomMySuffixDialogComponent implements OnInit {

    chatRoom: ChatRoomMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatRoomService: ChatRoomMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chatRoom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatRoomService.update(this.chatRoom));
        } else {
            this.subscribeToSaveResponse(
                this.chatRoomService.create(this.chatRoom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatRoomMySuffix>>) {
        result.subscribe((res: HttpResponse<ChatRoomMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatRoomMySuffix) {
        this.eventManager.broadcast({ name: 'chatRoomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chat-room-my-suffix-popup',
    template: ''
})
export class ChatRoomMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatRoomPopupService: ChatRoomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatRoomPopupService
                    .open(ChatRoomMySuffixDialogComponent as Component, params['id']);
            } else {
                this.chatRoomPopupService
                    .open(ChatRoomMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
