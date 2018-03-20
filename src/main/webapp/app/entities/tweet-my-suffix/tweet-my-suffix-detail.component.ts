import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TweetMySuffix } from './tweet-my-suffix.model';
import { TweetMySuffixService } from './tweet-my-suffix.service';

@Component({
    selector: 'jhi-tweet-my-suffix-detail',
    templateUrl: './tweet-my-suffix-detail.component.html'
})
export class TweetMySuffixDetailComponent implements OnInit, OnDestroy {

    tweet: TweetMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private tweetService: TweetMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTweets();
    }

    load(id) {
        this.tweetService.find(id)
            .subscribe((tweetResponse: HttpResponse<TweetMySuffix>) => {
                this.tweet = tweetResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTweets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tweetListModification',
            (response) => this.load(this.tweet.id)
        );
    }
}
