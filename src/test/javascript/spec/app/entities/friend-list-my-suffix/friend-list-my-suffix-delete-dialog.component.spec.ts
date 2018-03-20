/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { FriendListMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix-delete-dialog.component';
import { FriendListMySuffixService } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix.service';

describe('Component Tests', () => {

    describe('FriendListMySuffix Management Delete Component', () => {
        let comp: FriendListMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FriendListMySuffixDeleteDialogComponent>;
        let service: FriendListMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [FriendListMySuffixDeleteDialogComponent],
                providers: [
                    FriendListMySuffixService
                ]
            })
            .overrideTemplate(FriendListMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FriendListMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendListMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
