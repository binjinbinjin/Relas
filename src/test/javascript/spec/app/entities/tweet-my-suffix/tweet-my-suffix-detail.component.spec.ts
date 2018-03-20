/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { TweetMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix-detail.component';
import { TweetMySuffixService } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix.service';
import { TweetMySuffix } from '../../../../../../main/webapp/app/entities/tweet-my-suffix/tweet-my-suffix.model';

describe('Component Tests', () => {

    describe('TweetMySuffix Management Detail Component', () => {
        let comp: TweetMySuffixDetailComponent;
        let fixture: ComponentFixture<TweetMySuffixDetailComponent>;
        let service: TweetMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [TweetMySuffixDetailComponent],
                providers: [
                    TweetMySuffixService
                ]
            })
            .overrideTemplate(TweetMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TweetMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TweetMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TweetMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tweet).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
