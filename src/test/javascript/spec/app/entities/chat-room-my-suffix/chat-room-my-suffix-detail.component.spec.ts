/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix-detail.component';
import { ChatRoomMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix.service';
import { ChatRoomMySuffix } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix.model';

describe('Component Tests', () => {

    describe('ChatRoomMySuffix Management Detail Component', () => {
        let comp: ChatRoomMySuffixDetailComponent;
        let fixture: ComponentFixture<ChatRoomMySuffixDetailComponent>;
        let service: ChatRoomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMySuffixDetailComponent],
                providers: [
                    ChatRoomMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatRoomMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatRoom).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
