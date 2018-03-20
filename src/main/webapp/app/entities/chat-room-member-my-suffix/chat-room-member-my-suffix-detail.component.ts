import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoomMemberMySuffix } from './chat-room-member-my-suffix.model';
import { ChatRoomMemberMySuffixService } from './chat-room-member-my-suffix.service';

@Component({
    selector: 'jhi-chat-room-member-my-suffix-detail',
    templateUrl: './chat-room-member-my-suffix-detail.component.html'
})
export class ChatRoomMemberMySuffixDetailComponent implements OnInit, OnDestroy {

    chatRoomMember: ChatRoomMemberMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatRoomMemberService: ChatRoomMemberMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatRoomMembers();
    }

    load(id) {
        this.chatRoomMemberService.find(id)
            .subscribe((chatRoomMemberResponse: HttpResponse<ChatRoomMemberMySuffix>) => {
                this.chatRoomMember = chatRoomMemberResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatRoomMembers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatRoomMemberListModification',
            (response) => this.load(this.chatRoomMember.id)
        );
    }
}
