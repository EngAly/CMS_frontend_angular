import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { SearchService } from 'src/app/services/search.service';
import { SearchedFields } from 'src/app/models/SearchedFields';

@Component({
  selector: 'app-get-by-age',
  templateUrl: './get-by-age.component.html',
  styleUrls: ['./get-by-age.component.scss']
})
export class GetByAgeComponent {

  searchBy: SearchedFields = new SearchedFields();

  checkPatientAge = new FormGroup({
    s_age: new FormControl('', [Validators.required]),
    e_age: new FormControl('', [Validators.required])
  });

  constructor(private service: PatientService, private searchService: SearchService) {
    this.searchService.clearPatient();
    if (this.searchService.retriveStartAge() && this.searchService.retriveEndAge()) {
      this.searchBy.startAge = this.searchService.retriveStartAge();
      this.searchBy.endAge = this.searchService.retriveEndAge();
      this.searchByAge();
    }
  }

  get patientControls() {
    return this.checkPatientAge.controls;
  }

  searchByAge() {
    this.service.getPatientByAge(this.searchBy.startAge, this.searchBy.endAge).subscribe(
      data => {
        this.searchService.setPatient(data);
        // console.log(data)
        this.searchService.cacheStartAge(this.searchBy.startAge)
        this.searchService.cacheEndAge(this.searchBy.endAge)
      },
      error => {
        console.log(error)
      });
  }
}