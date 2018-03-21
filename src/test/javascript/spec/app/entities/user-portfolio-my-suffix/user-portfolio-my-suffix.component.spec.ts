/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { UserPortfolioMySuffixComponent } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix.component';
import { UserPortfolioMySuffixService } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix.service';
import { UserPortfolioMySuffix } from '../../../../../../main/webapp/app/entities/user-portfolio-my-suffix/user-portfolio-my-suffix.model';

describe('Component Tests', () => {

    describe('UserPortfolioMySuffix Management Component', () => {
        let comp: UserPortfolioMySuffixComponent;
        let fixture: ComponentFixture<UserPortfolioMySuffixComponent>;
        let service: UserPortfolioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [UserPortfolioMySuffixComponent],
                providers: [
                    UserPortfolioMySuffixService
                ]
            })
            .overrideTemplate(UserPortfolioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserPortfolioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPortfolioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserPortfolioMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userPortfolios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
