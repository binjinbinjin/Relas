/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { DatingRecordMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix-detail.component';
import { DatingRecordMySuffixService } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix.service';
import { DatingRecordMySuffix } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix.model';

describe('Component Tests', () => {

    describe('DatingRecordMySuffix Management Detail Component', () => {
        let comp: DatingRecordMySuffixDetailComponent;
        let fixture: ComponentFixture<DatingRecordMySuffixDetailComponent>;
        let service: DatingRecordMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [DatingRecordMySuffixDetailComponent],
                providers: [
                    DatingRecordMySuffixService
                ]
            })
            .overrideTemplate(DatingRecordMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatingRecordMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatingRecordMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DatingRecordMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.datingRecord).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
