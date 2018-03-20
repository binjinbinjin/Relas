/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { TweetMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix-delete-dialog.component';
import { TweetMySuffixService } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix.service';

describe('Component Tests', () => {

    describe('TweetMySuffix Management Delete Component', () => {
        let comp: TweetMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TweetMySuffixDeleteDialogComponent>;
        let service: TweetMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [TweetMySuffixDeleteDialogComponent],
                providers: [
                    TweetMySuffixService
                ]
            })
            .overrideTemplate(TweetMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TweetMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TweetMySuffixService);
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
