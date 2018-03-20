/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMemberMySuffixComponent } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.component';
import { ChatRoomMemberMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.service';
import { ChatRoomMemberMySuffix } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.model';

describe('Component Tests', () => {

    describe('ChatRoomMemberMySuffix Management Component', () => {
        let comp: ChatRoomMemberMySuffixComponent;
        let fixture: ComponentFixture<ChatRoomMemberMySuffixComponent>;
        let service: ChatRoomMemberMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMemberMySuffixComponent],
                providers: [
                    ChatRoomMemberMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMemberMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMemberMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMemberMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatRoomMemberMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatRoomMembers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
