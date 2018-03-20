import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChatMessageMySuffix } from './chat-message-my-suffix.model';
import { ChatMessageMySuffixService } from './chat-message-my-suffix.service';

@Injectable()
export class ChatMessageMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private chatMessageService: ChatMessageMySuffixService

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
                this.chatMessageService.find(id)
                    .subscribe((chatMessageResponse: HttpResponse<ChatMessageMySuffix>) => {
                        const chatMessage: ChatMessageMySuffix = chatMessageResponse.body;
                        chatMessage.time = this.datePipe
                            .transform(chatMessage.time, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.chatMessageModalRef(component, chatMessage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatMessageModalRef(component, new ChatMessageMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatMessageModalRef(component: Component, chatMessage: ChatMessageMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatMessage = chatMessage;
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
