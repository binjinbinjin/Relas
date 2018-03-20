/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix-delete-dialog.component';
import { ChatRoomMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix.service';

describe('Component Tests', () => {

    describe('ChatRoomMySuffix Management Delete Component', () => {
        let comp: ChatRoomMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ChatRoomMySuffixDeleteDialogComponent>;
        let service: ChatRoomMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMySuffixDeleteDialogComponent],
                providers: [
                    ChatRoomMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMySuffixService);
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
