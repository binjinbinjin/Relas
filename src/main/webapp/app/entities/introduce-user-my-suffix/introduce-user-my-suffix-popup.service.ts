import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { IntroduceUserMySuffix } from './introduce-user-my-suffix.model';
import { IntroduceUserMySuffixService } from './introduce-user-my-suffix.service';

@Injectable()
export class IntroduceUserMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private introduceUserService: IntroduceUserMySuffixService

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
                this.introduceUserService.find(id)
                    .subscribe((introduceUserResponse: HttpResponse<IntroduceUserMySuffix>) => {
                        const introduceUser: IntroduceUserMySuffix = introduceUserResponse.body;
                        introduceUser.time = this.datePipe
                            .transform(introduceUser.time, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.introduceUserModalRef(component, introduceUser);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.introduceUserModalRef(component, new IntroduceUserMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    introduceUserModalRef(component: Component, introduceUser: IntroduceUserMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.introduceUser = introduceUser;
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
