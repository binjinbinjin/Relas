/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { UserPortfolioMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix-delete-dialog.component';
import { UserPortfolioMySuffixService } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix.service';

describe('Component Tests', () => {

    describe('UserPortfolioMySuffix Management Delete Component', () => {
        let comp: UserPortfolioMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<UserPortfolioMySuffixDeleteDialogComponent>;
        let service: UserPortfolioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [UserPortfolioMySuffixDeleteDialogComponent],
                providers: [
                    UserPortfolioMySuffixService
                ]
            })
            .overrideTemplate(UserPortfolioMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserPortfolioMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPortfolioMySuffixService);
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
