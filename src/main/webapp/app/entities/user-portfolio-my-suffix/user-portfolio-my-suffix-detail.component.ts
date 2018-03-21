import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { UserPortfolioMySuffix } from './user-portfolio-my-suffix.model';
import { UserPortfolioMySuffixService } from './user-portfolio-my-suffix.service';

@Component({
    selector: 'jhi-user-portfolio-my-suffix-detail',
    templateUrl: './user-portfolio-my-suffix-detail.component.html'
})
export class UserPortfolioMySuffixDetailComponent implements OnInit, OnDestroy {

    userPortfolio: UserPortfolioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private userPortfolioService: UserPortfolioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserPortfolios();
    }

    load(id) {
        this.userPortfolioService.find(id)
            .subscribe((userPortfolioResponse: HttpResponse<UserPortfolioMySuffix>) => {
                this.userPortfolio = userPortfolioResponse.body;
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

    registerChangeInUserPortfolios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userPortfolioListModification',
            (response) => this.load(this.userPortfolio.id)
        );
    }
}
