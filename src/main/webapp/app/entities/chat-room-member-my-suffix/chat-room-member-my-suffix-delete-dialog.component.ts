import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoomMemberMySuffix } from './chat-room-member-my-suffix.model';
import { ChatRoomMemberMySuffixPopupService } from './chat-room-member-my-suffix-popup.service';
import { ChatRoomMemberMySuffixService } from './chat-room-member-my-suffix.service';

@Component({
    selector: 'jhi-chat-room-member-my-suffix-delete-dialog',
    templateUrl: './chat-room-member-my-suffix-delete-dialog.component.html'
})
export class ChatRoomMemberMySuffixDeleteDialogComponent {

    chatRoomMember: ChatRoomMemberMySuffix;

    constructor(
        private chatRoomMemberService: ChatRoomMemberMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatRoomMemberService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatRoomMemberListModification',
                content: 'Deleted an chatRoomMember'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-room-member-my-suffix-delete-popup',
    template: ''
})
export class ChatRoomMemberMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatRoomMemberPopupService: ChatRoomMemberMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatRoomMemberPopupService
                .open(ChatRoomMemberMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
