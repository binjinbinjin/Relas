/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RelasTestModule } from '../../../test.module';
import { FriendListMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix-detail.component';
import { FriendListMySuffixService } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix.service';
import { FriendListMySuffix } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix.model';

describe('Component Tests', () => {

    describe('FriendListMySuffix Management Detail Component', () => {
        let comp: FriendListMySuffixDetailComponent;
        let fixture: ComponentFixture<FriendListMySuffixDetailComponent>;
        let service: FriendListMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [FriendListMySuffixDetailComponent],
                providers: [
                    FriendListMySuffixService
                ]
            })
            .overrideTemplate(FriendListMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FriendListMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendListMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FriendListMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.friendList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
