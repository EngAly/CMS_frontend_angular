import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPatientImagesComponent } from './show-patient-images.component';

describe('ShPatientImagesComponent', () => {
  let component: ShowPatientImagesComponent;
  let fixture: ComponentFixture<ShowPatientImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPatientImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPatientImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
