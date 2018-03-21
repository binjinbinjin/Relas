/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { UserPortfolioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix-detail.component';
import { UserPortfolioMySuffixService } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix.service';
import { UserPortfolioMySuffix } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix.model';

describe('Component Tests', () => {

    describe('UserPortfolioMySuffix Management Detail Component', () => {
        let comp: UserPortfolioMySuffixDetailComponent;
        let fixture: ComponentFixture<UserPortfolioMySuffixDetailComponent>;
        let service: UserPortfolioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [UserPortfolioMySuffixDetailComponent],
                providers: [
                    UserPortfolioMySuffixService
                ]
            })
            .overrideTemplate(UserPortfolioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserPortfolioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPortfolioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserPortfolioMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userPortfolio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
