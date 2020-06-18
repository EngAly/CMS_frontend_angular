import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Utils from 'src/app/utils';
import { SearchService } from 'src/app/services/search.service';
import { SearchedFields } from 'src/app/models/SearchedFields';

@Component({
  selector: 'app-get-by-name',
  templateUrl: './get-by-name.component.html'
})
export class GetByNameComponent {

  patients: Array<Patient> = [];

  searchBy: SearchedFields = new SearchedFields();

  checkPatientName = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private service: PatientService, private searchService: SearchService) {
    this.searchService.clearPatient();
    // get cached patientName in Utils
    if (this.searchService.retrivePatientName()) {
      this.searchBy.name = this.searchService.retrivePatientName();
      this.searchByName();
    }
  }

  get patientControls() {
    return this.checkPatientName.controls;
  }

  searchByName() {
    // alert(this.patientName)
    this.service.getPatientByName(this.searchBy.name).subscribe(
      data => {
        // console.log(data)
        this.searchService.setPatient(data);

        // cache patientName to Utils to restore it to same page after user leave it 
        // so he can find the result of search as it with out losing for data
        this.searchService.cachePatientName(this.searchBy.name)
      },
      error => {
        console.log(error)
      });
  }
}