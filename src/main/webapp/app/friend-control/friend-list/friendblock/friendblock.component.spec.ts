import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendblockComponent } from './friendblock.component';

describe('FriendblockComponent', () => {
  let component: FriendblockComponent;
  let fixture: ComponentFixture<FriendblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
