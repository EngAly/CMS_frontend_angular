import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalsComponent } from './medicals.component';

describe('MedicalsComponent', () => {
  let component: MedicalsComponent;
  let fixture: ComponentFixture<MedicalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
