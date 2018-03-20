/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { ChatMessageMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix/chat-message-my-suffix-detail.component';
import { ChatMessageMySuffixService } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix/chat-message-my-suffix.service';
import { ChatMessageMySuffix } from '../../../../../../main/webapp/app/entities/chat-message-my-suffix/chat-message-my-suffix.model';

describe('Component Tests', () => {

    describe('ChatMessageMySuffix Management Detail Component', () => {
        let comp: ChatMessageMySuffixDetailComponent;
        let fixture: ComponentFixture<ChatMessageMySuffixDetailComponent>;
        let service: ChatMessageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [ChatMessageMySuffixDetailComponent],
                providers: [
                    ChatMessageMySuffixService
                ]
            })
            .overrideTemplate(ChatMessageMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatMessageMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatMessage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
