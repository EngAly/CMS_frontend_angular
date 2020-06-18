import { Component, OnInit, Injectable } from '@angular/core';
import { SearchedFields } from 'src/app/models/SearchedFields';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { SearchService } from 'src/app/services/search.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-get-by-date',
  templateUrl: './get-by-date.component.html',
  styleUrls: ['./get-by-date.component.scss']
})
export class GetByDateComponent {

  searchBy: SearchedFields = new SearchedFields();

  checkPatientDate = new FormGroup({
    s_date: new FormControl('', [Validators.required]),
    e_date: new FormControl('', [Validators.required])
  });

  constructor(private service: PatientService, private searchService: SearchService, private datePipe: DatePipe) {
    this.searchService.clearPatient();
    // if (this.searchService.retriveStartDate() && this.searchService.retriveEndDate()) {
    //   this.searchBy.startDate = this.datePipe.transform(this.searchService.retriveStartDate());
    //   this.searchBy.endDate = this.datePipe.transform(this.searchService.retriveEndDate());
    //   this.searchByDate();
    // }
  }

  get patientControls() { return this.checkPatientDate.controls; }

  searchByDate() {
    // this.datePipe.transform to format date as you like note you must import DatePipe in app.module providers
    // alert(this.datePipe.transform(this.searchBy.startDate, 'dd-MM-yyyy'))
    this.service.getPatientByDate(this.datePipe.transform(this.searchBy.startDate, 'dd-MM-yyyy'),
      this.datePipe.transform(this.searchBy.endDate, 'dd-MM-yyyy')).subscribe(
        data => {
          this.searchService.setPatient(data);
          // console.log(data)
          this.searchService.cacheStartDate(this.searchBy.startDate)
          this.searchService.cacheEndDate(this.searchBy.endDate)
        },
        error => {
          console.log(error)
        });
  }

}
