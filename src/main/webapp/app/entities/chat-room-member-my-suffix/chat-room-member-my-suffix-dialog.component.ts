import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChatRoomMemberMySuffix } from './chat-room-member-my-suffix.model';
import { ChatRoomMemberMySuffixPopupService } from './chat-room-member-my-suffix-popup.service';
import { ChatRoomMemberMySuffixService } from './chat-room-member-my-suffix.service';
import { ChatRoomMySuffix, ChatRoomMySuffixService } from '../chat-room-my-suffix';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-chat-room-member-my-suffix-dialog',
    templateUrl: './chat-room-member-my-suffix-dialog.component.html'
})
export class ChatRoomMemberMySuffixDialogComponent implements OnInit {

    chatRoomMember: ChatRoomMemberMySuffix;
    isSaving: boolean;

    chatrooms: ChatRoomMySuffix[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chatRoomMemberService: ChatRoomMemberMySuffixService,
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

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chatRoomMember.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatRoomMemberService.update(this.chatRoomMember));
        } else {
            this.subscribeToSaveResponse(
                this.chatRoomMemberService.create(this.chatRoomMember));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatRoomMemberMySuffix>>) {
        result.subscribe((res: HttpResponse<ChatRoomMemberMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatRoomMemberMySuffix) {
        this.eventManager.broadcast({ name: 'chatRoomMemberListModification', content: 'OK'});
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
    selector: 'jhi-chat-room-member-my-suffix-popup',
    template: ''
})
export class ChatRoomMemberMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatRoomMemberPopupService: ChatRoomMemberMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatRoomMemberPopupService
                    .open(ChatRoomMemberMySuffixDialogComponent as Component, params['id']);
            } else {
                this.chatRoomMemberPopupService
                    .open(ChatRoomMemberMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
