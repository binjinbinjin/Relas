import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IntroduceUserMySuffix } from './introduce-user-my-suffix.model';
import { IntroduceUserMySuffixService } from './introduce-user-my-suffix.service';

@Component({
    selector: 'jhi-introduce-user-my-suffix-detail',
    templateUrl: './introduce-user-my-suffix-detail.component.html'
})
export class IntroduceUserMySuffixDetailComponent implements OnInit, OnDestroy {

    introduceUser: IntroduceUserMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private introduceUserService: IntroduceUserMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIntroduceUsers();
    }

    load(id) {
        this.introduceUserService.find(id)
            .subscribe((introduceUserResponse: HttpResponse<IntroduceUserMySuffix>) => {
                this.introduceUser = introduceUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIntroduceUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'introduceUserListModification',
            (response) => this.load(this.introduceUser.id)
        );
    }
}
