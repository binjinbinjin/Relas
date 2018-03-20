/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { TweetMySuffixComponent } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix.component';
import { TweetMySuffixService } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix.service';
import { TweetMySuffix } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix.model';

describe('Component Tests', () => {

    describe('TweetMySuffix Management Component', () => {
        let comp: TweetMySuffixComponent;
        let fixture: ComponentFixture<TweetMySuffixComponent>;
        let service: TweetMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [TweetMySuffixComponent],
                providers: [
                    TweetMySuffixService
                ]
            })
            .overrideTemplate(TweetMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TweetMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TweetMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TweetMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tweets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
