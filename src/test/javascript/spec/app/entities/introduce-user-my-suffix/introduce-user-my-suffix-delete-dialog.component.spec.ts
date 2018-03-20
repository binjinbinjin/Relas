/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { IntroduceUserMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix-delete-dialog.component';
import { IntroduceUserMySuffixService } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix.service';

describe('Component Tests', () => {

    describe('IntroduceUserMySuffix Management Delete Component', () => {
        let comp: IntroduceUserMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<IntroduceUserMySuffixDeleteDialogComponent>;
        let service: IntroduceUserMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [IntroduceUserMySuffixDeleteDialogComponent],
                providers: [
                    IntroduceUserMySuffixService
                ]
            })
            .overrideTemplate(IntroduceUserMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntroduceUserMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntroduceUserMySuffixService);
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
