import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DatingRecordMySuffix } from './dating-record-my-suffix.model';
import { DatingRecordMySuffixService } from './dating-record-my-suffix.service';

@Component({
    selector: 'jhi-dating-record-my-suffix-detail',
    templateUrl: './dating-record-my-suffix-detail.component.html'
})
export class DatingRecordMySuffixDetailComponent implements OnInit, OnDestroy {

    datingRecord: DatingRecordMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private datingRecordService: DatingRecordMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDatingRecords();
    }

    load(id) {
        this.datingRecordService.find(id)
            .subscribe((datingRecordResponse: HttpResponse<DatingRecordMySuffix>) => {
                this.datingRecord = datingRecordResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDatingRecords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datingRecordListModification',
            (response) => this.load(this.datingRecord.id)
        );
    }
}
