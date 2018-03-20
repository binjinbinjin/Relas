/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { UnreadChatMessageMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix-detail.component';
import { UnreadChatMessageMySuffixService } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.service';
import { UnreadChatMessageMySuffix } from '../../../../../../main/webapp/app/entities/unread-chat-message-my-suffix/unread-chat-message-my-suffix.model';

describe('Component Tests', () => {

    describe('UnreadChatMessageMySuffix Management Detail Component', () => {
        let comp: UnreadChatMessageMySuffixDetailComponent;
        let fixture: ComponentFixture<UnreadChatMessageMySuffixDetailComponent>;
        let service: UnreadChatMessageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [UnreadChatMessageMySuffixDetailComponent],
                providers: [
                    UnreadChatMessageMySuffixService
                ]
            })
            .overrideTemplate(UnreadChatMessageMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnreadChatMessageMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnreadChatMessageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UnreadChatMessageMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.unreadChatMessage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
