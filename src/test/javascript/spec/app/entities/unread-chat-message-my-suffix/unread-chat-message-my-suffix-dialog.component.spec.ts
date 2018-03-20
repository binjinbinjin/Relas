/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RelasTestModule } from '../../../test.module';
import { UnreadChatMessageMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix-dialog.component';
import { UnreadChatMessageMySuffixService } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.service';
import { UnreadChatMessageMySuffix } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.model';
import { ChatMessageMySuffixService } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('UnreadChatMessageMySuffix Management Dialog Component', () => {
        let comp: UnreadChatMessageMySuffixDialogComponent;
        let fixture: ComponentFixture<UnreadChatMessageMySuffixDialogComponent>;
        let service: UnreadChatMessageMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [UnreadChatMessageMySuffixDialogComponent],
                providers: [
                    ChatMessageMySuffixService,
                    UserService,
                    UnreadChatMessageMySuffixService
                ]
            })
            .overrideTemplate(UnreadChatMessageMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnreadChatMessageMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnreadChatMessageMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UnreadChatMessageMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.unreadChatMessage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'unreadChatMessageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UnreadChatMessageMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.unreadChatMessage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'unreadChatMessageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
