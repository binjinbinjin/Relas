import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UnreadChatMessageMySuffix } from './unread-chat-message-my-suffix.model';
import { UnreadChatMessageMySuffixService } from './unread-chat-message-my-suffix.service';

@Component({
    selector: 'jhi-unread-chat-message-my-suffix-detail',
    templateUrl: './unread-chat-message-my-suffix-detail.component.html'
})
export class UnreadChatMessageMySuffixDetailComponent implements OnInit, OnDestroy {

    unreadChatMessage: UnreadChatMessageMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private unreadChatMessageService: UnreadChatMessageMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUnreadChatMessages();
    }

    load(id) {
        this.unreadChatMessageService.find(id)
            .subscribe((unreadChatMessageResponse: HttpResponse<UnreadChatMessageMySuffix>) => {
                this.unreadChatMessage = unreadChatMessageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUnreadChatMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'unreadChatMessageListModification',
            (response) => this.load(this.unreadChatMessage.id)
        );
    }
}
