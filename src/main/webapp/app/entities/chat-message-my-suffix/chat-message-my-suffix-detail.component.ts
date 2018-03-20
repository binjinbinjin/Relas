import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ChatMessageMySuffix } from './chat-message-my-suffix.model';
import { ChatMessageMySuffixService } from './chat-message-my-suffix.service';

@Component({
    selector: 'jhi-chat-message-my-suffix-detail',
    templateUrl: './chat-message-my-suffix-detail.component.html'
})
export class ChatMessageMySuffixDetailComponent implements OnInit, OnDestroy {

    chatMessage: ChatMessageMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private chatMessageService: ChatMessageMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatMessages();
    }

    load(id) {
        this.chatMessageService.find(id)
            .subscribe((chatMessageResponse: HttpResponse<ChatMessageMySuffix>) => {
                this.chatMessage = chatMessageResponse.body;
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

    registerChangeInChatMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatMessageListModification',
            (response) => this.load(this.chatMessage.id)
        );
    }
}
