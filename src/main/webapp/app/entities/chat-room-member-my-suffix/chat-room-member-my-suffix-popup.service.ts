import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChatRoomMemberMySuffix } from './chat-room-member-my-suffix.model';
import { ChatRoomMemberMySuffixService } from './chat-room-member-my-suffix.service';

@Injectable()
export class ChatRoomMemberMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatRoomMemberService: ChatRoomMemberMySuffixService

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
                this.chatRoomMemberService.find(id)
                    .subscribe((chatRoomMemberResponse: HttpResponse<ChatRoomMemberMySuffix>) => {
                        const chatRoomMember: ChatRoomMemberMySuffix = chatRoomMemberResponse.body;
                        this.ngbModalRef = this.chatRoomMemberModalRef(component, chatRoomMember);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatRoomMemberModalRef(component, new ChatRoomMemberMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatRoomMemberModalRef(component: Component, chatRoomMember: ChatRoomMemberMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatRoomMember = chatRoomMember;
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
