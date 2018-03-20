import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntroduceUserMySuffix } from './introduce-user-my-suffix.model';
import { IntroduceUserMySuffixPopupService } from './introduce-user-my-suffix-popup.service';
import { IntroduceUserMySuffixService } from './introduce-user-my-suffix.service';

@Component({
    selector: 'jhi-introduce-user-my-suffix-delete-dialog',
    templateUrl: './introduce-user-my-suffix-delete-dialog.component.html'
})
export class IntroduceUserMySuffixDeleteDialogComponent {

    introduceUser: IntroduceUserMySuffix;

    constructor(
        private introduceUserService: IntroduceUserMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.introduceUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'introduceUserListModification',
                content: 'Deleted an introduceUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-introduce-user-my-suffix-delete-popup',
    template: ''
})
export class IntroduceUserMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private introduceUserPopupService: IntroduceUserMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.introduceUserPopupService
                .open(IntroduceUserMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
