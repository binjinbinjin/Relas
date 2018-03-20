/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RelasTestModule } from '../../../test.module';
import { FriendListMySuffixComponent } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix.component';
import { FriendListMySuffixService } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix.service';
import { FriendListMySuffix } from '../../../../../../main/webapp/app/entities/friend-list-my-suffix/friend-list-my-suffix.model';

describe('Component Tests', () => {

    describe('FriendListMySuffix Management Component', () => {
        let comp: FriendListMySuffixComponent;
        let fixture: ComponentFixture<FriendListMySuffixComponent>;
        let service: FriendListMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RelasTestModule],
                declarations: [FriendListMySuffixComponent],
                providers: [
                    FriendListMySuffixService
                ]
            })
            .overrideTemplate(FriendListMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FriendListMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendListMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FriendListMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.friendLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
