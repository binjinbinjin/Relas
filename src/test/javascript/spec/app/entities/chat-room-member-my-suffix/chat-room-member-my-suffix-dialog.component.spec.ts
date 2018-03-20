/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMemberMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix-dialog.component';
import { ChatRoomMemberMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.service';
import { ChatRoomMemberMySuffix } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.model';
import { ChatRoomMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('ChatRoomMemberMySuffix Management Dialog Component', () => {
        let comp: ChatRoomMemberMySuffixDialogComponent;
        let fixture: ComponentFixture<ChatRoomMemberMySuffixDialogComponent>;
        let service: ChatRoomMemberMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMemberMySuffixDialogComponent],
                providers: [
                    ChatRoomMySuffixService,
                    UserService,
                    ChatRoomMemberMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMemberMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMemberMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMemberMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatRoomMemberMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatRoomMember = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatRoomMemberListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatRoomMemberMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatRoomMember = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatRoomMemberListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
