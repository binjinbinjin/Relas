/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { DatingRecordMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix-delete-dialog.component';
import { DatingRecordMySuffixService } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix.service';

describe('Component Tests', () => {

    describe('DatingRecordMySuffix Management Delete Component', () => {
        let comp: DatingRecordMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DatingRecordMySuffixDeleteDialogComponent>;
        let service: DatingRecordMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [DatingRecordMySuffixDeleteDialogComponent],
                providers: [
                    DatingRecordMySuffixService
                ]
            })
            .overrideTemplate(DatingRecordMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatingRecordMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatingRecordMySuffixService);
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
