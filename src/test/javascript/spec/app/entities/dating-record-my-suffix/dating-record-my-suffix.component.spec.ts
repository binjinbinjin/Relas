/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { DatingRecordMySuffixComponent } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix.component';
import { DatingRecordMySuffixService } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix.service';
import { DatingRecordMySuffix } from '../../../../../../main/webapp/app/entities/dating-record-my-suffix/dating-record-my-suffix.model';

describe('Component Tests', () => {

    describe('DatingRecordMySuffix Management Component', () => {
        let comp: DatingRecordMySuffixComponent;
        let fixture: ComponentFixture<DatingRecordMySuffixComponent>;
        let service: DatingRecordMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [DatingRecordMySuffixComponent],
                providers: [
                    DatingRecordMySuffixService
                ]
            })
            .overrideTemplate(DatingRecordMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatingRecordMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatingRecordMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DatingRecordMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.datingRecords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
