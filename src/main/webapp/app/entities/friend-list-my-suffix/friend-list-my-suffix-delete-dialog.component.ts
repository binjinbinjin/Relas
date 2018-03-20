import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FriendListMySuffix } from './friend-list-my-suffix.model';
import { FriendListMySuffixPopupService } from './friend-list-my-suffix-popup.service';
import { FriendListMySuffixService } from './friend-list-my-suffix.service';

@Component({
    selector: 'jhi-friend-list-my-suffix-delete-dialog',
    templateUrl: './friend-list-my-suffix-delete-dialog.component.html'
})
export class FriendListMySuffixDeleteDialogComponent {

    friendList: FriendListMySuffix;

    constructor(
        private friendListService: FriendListMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.friendListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'friendListListModification',
                content: 'Deleted an friendList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-friend-list-my-suffix-delete-popup',
    template: ''
})
export class FriendListMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private friendListPopupService: FriendListMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.friendListPopupService
                .open(FriendListMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
