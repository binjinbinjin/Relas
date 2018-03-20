/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { ChatMessageMySuffixComponent } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix/chat-message-my-suffix.component';
import { ChatMessageMySuffixService } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix/chat-message-my-suffix.service';
import { ChatMessageMySuffix } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix/chat-message-my-suffix.model';

describe('Component Tests', () => {

    describe('ChatMessageMySuffix Management Component', () => {
        let comp: ChatMessageMySuffixComponent;
        let fixture: ComponentFixture<ChatMessageMySuffixComponent>;
        let service: ChatMessageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatMessageMySuffixComponent],
                providers: [
                    ChatMessageMySuffixService
                ]
            })
            .overrideTemplate(ChatMessageMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatMessageMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatMessages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
