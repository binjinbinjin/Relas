/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMemberMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix-delete-dialog.component';
import { ChatRoomMemberMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.service';

describe('Component Tests', () => {

    describe('ChatRoomMemberMySuffix Management Delete Component', () => {
        let comp: ChatRoomMemberMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ChatRoomMemberMySuffixDeleteDialogComponent>;
        let service: ChatRoomMemberMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMemberMySuffixDeleteDialogComponent],
                providers: [
                    ChatRoomMemberMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMemberMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMemberMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMemberMySuffixService);
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
