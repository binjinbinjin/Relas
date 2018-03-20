/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { IntroduceUserMySuffixComponent } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix.component';
import { IntroduceUserMySuffixService } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix.service';
import { IntroduceUserMySuffix } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix.model';

describe('Component Tests', () => {

    describe('IntroduceUserMySuffix Management Component', () => {
        let comp: IntroduceUserMySuffixComponent;
        let fixture: ComponentFixture<IntroduceUserMySuffixComponent>;
        let service: IntroduceUserMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [IntroduceUserMySuffixComponent],
                providers: [
                    IntroduceUserMySuffixService
                ]
            })
            .overrideTemplate(IntroduceUserMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntroduceUserMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntroduceUserMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IntroduceUserMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.introduceUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
