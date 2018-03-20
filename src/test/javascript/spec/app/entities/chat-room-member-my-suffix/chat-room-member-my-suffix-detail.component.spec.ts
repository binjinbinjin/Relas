/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMemberMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix-detail.component';
import { ChatRoomMemberMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.service';
import { ChatRoomMemberMySuffix } from '../../../../../../main/webapp/app/entities/chat-room-member-my-suffix/chat-room-member-my-suffix.model';

describe('Component Tests', () => {

    describe('ChatRoomMemberMySuffix Management Detail Component', () => {
        let comp: ChatRoomMemberMySuffixDetailComponent;
        let fixture: ComponentFixture<ChatRoomMemberMySuffixDetailComponent>;
        let service: ChatRoomMemberMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMemberMySuffixDetailComponent],
                providers: [
                    ChatRoomMemberMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMemberMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMemberMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMemberMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatRoomMemberMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatRoomMember).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
