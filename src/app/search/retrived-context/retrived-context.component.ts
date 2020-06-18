import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import Utils from 'src/app/utils';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'retrived-context',
  templateUrl: './retrived-context.component.html',
  styleUrls: ['./retrived-context.component.scss']
})
export class RetrivedContextComponent {

  patients: Patient[];

  constructor(private route: Router, private activeRoute: ActivatedRoute,
    private searchService: SearchService) {
      //  pass patient data to shared service to save it so can access it form 
      // another places
    this.searchService.getPatient().subscribe(patient => this.patients = patient)

  }

  getPatientDetails(patient: Patient) {
    this.route.navigate([patient.id], { relativeTo: this.activeRoute })
    Utils.patient = patient;
    // console.log(patient)
  }
}
