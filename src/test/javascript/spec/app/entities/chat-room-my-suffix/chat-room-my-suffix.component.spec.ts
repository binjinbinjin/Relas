/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { ChatRoomMySuffixComponent } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix.component';
import { ChatRoomMySuffixService } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix.service';
import { ChatRoomMySuffix } from '../../../../../../main/webapp/app/entities/chat-room-my-suffix/chat-room-my-suffix.model';

describe('Component Tests', () => {

    describe('ChatRoomMySuffix Management Component', () => {
        let comp: ChatRoomMySuffixComponent;
        let fixture: ComponentFixture<ChatRoomMySuffixComponent>;
        let service: ChatRoomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatRoomMySuffixComponent],
                providers: [
                    ChatRoomMySuffixService
                ]
            })
            .overrideTemplate(ChatRoomMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatRoomMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatRooms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
