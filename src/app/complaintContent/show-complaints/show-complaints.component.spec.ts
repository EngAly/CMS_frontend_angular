import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowComplaintsComponent } from './show-complaints.component';

describe('ShowComplaintsComponent', () => {
  let component: ShowComplaintsComponent;
  let fixture: ComponentFixture<ShowComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
