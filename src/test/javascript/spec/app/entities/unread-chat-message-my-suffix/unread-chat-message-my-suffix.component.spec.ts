/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { UnreadChatMessageMySuffixComponent } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.component';
import { UnreadChatMessageMySuffixService } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.service';
import { UnreadChatMessageMySuffix } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.model';

describe('Component Tests', () => {

    describe('UnreadChatMessageMySuffix Management Component', () => {
        let comp: UnreadChatMessageMySuffixComponent;
        let fixture: ComponentFixture<UnreadChatMessageMySuffixComponent>;
        let service: UnreadChatMessageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [UnreadChatMessageMySuffixComponent],
                providers: [
                    UnreadChatMessageMySuffixService
                ]
            })
            .overrideTemplate(UnreadChatMessageMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnreadChatMessageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnreadChatMessageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UnreadChatMessageMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.unreadChatMessages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
