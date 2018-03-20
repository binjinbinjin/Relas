import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TweetMySuffix } from './tweet-my-suffix.model';
import { TweetMySuffixService } from './tweet-my-suffix.service';

@Injectable()
export class TweetMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tweetService: TweetMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tweetService.find(id)
                    .subscribe((tweetResponse: HttpResponse<TweetMySuffix>) => {
                        const tweet: TweetMySuffix = tweetResponse.body;
                        tweet.time = this.datePipe
                            .transform(tweet.time, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.tweetModalRef(component, tweet);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tweetModalRef(component, new TweetMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tweetModalRef(component: Component, tweet: TweetMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tweet = tweet;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
