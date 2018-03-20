import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoomMySuffix } from './chat-room-my-suffix.model';
import { ChatRoomMySuffixService } from './chat-room-my-suffix.service';

@Component({
    selector: 'jhi-chat-room-my-suffix-detail',
    templateUrl: './chat-room-my-suffix-detail.component.html'
})
export class ChatRoomMySuffixDetailComponent implements OnInit, OnDestroy {

    chatRoom: ChatRoomMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatRoomService: ChatRoomMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatRooms();
    }

    load(id) {
        this.chatRoomService.find(id)
            .subscribe((chatRoomResponse: HttpResponse<ChatRoomMySuffix>) => {
                this.chatRoom = chatRoomResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatRooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatRoomListModification',
            (response) => this.load(this.chatRoom.id)
        );
    }
}
