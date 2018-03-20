import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FriendListMySuffix } from './friend-list-my-suffix.model';
import { FriendListMySuffixService } from './friend-list-my-suffix.service';

@Component({
    selector: 'jhi-friend-list-my-suffix-detail',
    templateUrl: './friend-list-my-suffix-detail.component.html'
})
export class FriendListMySuffixDetailComponent implements OnInit, OnDestroy {

    friendList: FriendListMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private friendListService: FriendListMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFriendLists();
    }

    load(id) {
        this.friendListService.find(id)
            .subscribe((friendListResponse: HttpResponse<FriendListMySuffix>) => {
                this.friendList = friendListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFriendLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'friendListListModification',
            (response) => this.load(this.friendList.id)
        );
    }
}
