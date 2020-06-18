import { Component} from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/Patient';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-show-patients',
  templateUrl: './show-patients.component.html',
  styleUrls: ['./show-patients.component.scss']
})
export class ShowPatientsComponent {

  patients: Array<Patient> = [];

  // should make property public/default to make view access it
  totalPages: number;
  currentPage: number = 0;
  noData: boolean = true;

  private errorMessage: string;

  constructor(private service: PatientService, private route: Router, private activeRoute: ActivatedRoute) {
    this.onCurrentPageChange();
  }

  onCurrentPageChange() {
    this.service.getPatientPage(this.currentPage).subscribe(
      data => {
        this.patients = data['content']
        this.totalPages = data['totalPages']
        if (this.patients) {
          this.noData = false;
        }
      },
      error => {
        this.errorMessage = error
        console.log(this.errorMessage)
      }
    );
  }

  First() {
    this.currentPage = 0;
    this.onCurrentPageChange()
  }

  Previous() {
    this.currentPage > 0 ? this.currentPage-- : this.currentPage
    this.onCurrentPageChange()
  }

  Next() {
    // this.currentPage < this.totalPages - 1 ? this.currentPage++ : this.currentPage
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++
      this.onCurrentPageChange()
    }


  }

  Last() {
    this.currentPage = this.totalPages - 1;
    this.onCurrentPageChange()
  }

  getPatientDetails(patient: Patient) {
    this.route.navigate([patient.id], { relativeTo: this.activeRoute })
    Utils.patient = patient;
    // console.log(patient)
  }
}
