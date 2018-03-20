/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { IntroduceUserMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix-detail.component';
import { IntroduceUserMySuffixService } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix.service';
import { IntroduceUserMySuffix } from '../../../../../../main/webapp/app/entities/introduce-user-my-suffix/introduce-user-my-suffix.model';

describe('Component Tests', () => {

    describe('IntroduceUserMySuffix Management Detail Component', () => {
        let comp: IntroduceUserMySuffixDetailComponent;
        let fixture: ComponentFixture<IntroduceUserMySuffixDetailComponent>;
        let service: IntroduceUserMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [IntroduceUserMySuffixDetailComponent],
                providers: [
                    IntroduceUserMySuffixService
                ]
            })
            .overrideTemplate(IntroduceUserMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntroduceUserMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntroduceUserMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IntroduceUserMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.introduceUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
