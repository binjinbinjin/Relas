import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UnreadChatMessageMySuffix } from './unread-chat-message-my-suffix.model';
import { UnreadChatMessageMySuffixService } from './unread-chat-message-my-suffix.service';

@Injectable()
export class UnreadChatMessageMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private unreadChatMessageService: UnreadChatMessageMySuffixService

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
                this.unreadChatMessageService.find(id)
                    .subscribe((unreadChatMessageResponse: HttpResponse<UnreadChatMessageMySuffix>) => {
                        const unreadChatMessage: UnreadChatMessageMySuffix = unreadChatMessageResponse.body;
                        this.ngbModalRef = this.unreadChatMessageModalRef(component, unreadChatMessage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.unreadChatMessageModalRef(component, new UnreadChatMessageMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    unreadChatMessageModalRef(component: Component, unreadChatMessage: UnreadChatMessageMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.unreadChatMessage = unreadChatMessage;
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
