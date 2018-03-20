import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChatRoomMySuffix } from './chat-room-my-suffix.model';
import { ChatRoomMySuffixService } from './chat-room-my-suffix.service';

@Injectable()
export class ChatRoomMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatRoomService: ChatRoomMySuffixService

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
                this.chatRoomService.find(id)
                    .subscribe((chatRoomResponse: HttpResponse<ChatRoomMySuffix>) => {
                        const chatRoom: ChatRoomMySuffix = chatRoomResponse.body;
                        this.ngbModalRef = this.chatRoomModalRef(component, chatRoom);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatRoomModalRef(component, new ChatRoomMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatRoomModalRef(component: Component, chatRoom: ChatRoomMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatRoom = chatRoom;
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
