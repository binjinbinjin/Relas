import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoomMySuffix } from './chat-room-my-suffix.model';
import { ChatRoomMySuffixPopupService } from './chat-room-my-suffix-popup.service';
import { ChatRoomMySuffixService } from './chat-room-my-suffix.service';

@Component({
    selector: 'jhi-chat-room-my-suffix-delete-dialog',
    templateUrl: './chat-room-my-suffix-delete-dialog.component.html'
})
export class ChatRoomMySuffixDeleteDialogComponent {

    chatRoom: ChatRoomMySuffix;

    constructor(
        private chatRoomService: ChatRoomMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatRoomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatRoomListModification',
                content: 'Deleted an chatRoom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-room-my-suffix-delete-popup',
    template: ''
})
export class ChatRoomMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatRoomPopupService: ChatRoomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatRoomPopupService
                .open(ChatRoomMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
