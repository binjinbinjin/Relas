import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UnreadChatMessageMySuffix } from './unread-chat-message-my-suffix.model';
import { UnreadChatMessageMySuffixPopupService } from './unread-chat-message-my-suffix-popup.service';
import { UnreadChatMessageMySuffixService } from './unread-chat-message-my-suffix.service';

@Component({
    selector: 'jhi-unread-chat-message-my-suffix-delete-dialog',
    templateUrl: './unread-chat-message-my-suffix-delete-dialog.component.html'
})
export class UnreadChatMessageMySuffixDeleteDialogComponent {

    unreadChatMessage: UnreadChatMessageMySuffix;

    constructor(
        private unreadChatMessageService: UnreadChatMessageMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.unreadChatMessageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'unreadChatMessageListModification',
                content: 'Deleted an unreadChatMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-unread-chat-message-my-suffix-delete-popup',
    template: ''
})
export class UnreadChatMessageMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unreadChatMessagePopupService: UnreadChatMessageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.unreadChatMessagePopupService
                .open(UnreadChatMessageMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
