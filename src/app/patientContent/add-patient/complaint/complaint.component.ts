import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { ComplaintService } from 'src/app/services/complaint.service';
import { Complaints } from 'src/app/models/Complaints';
import Utils from 'src/app/utils';

@Component({
  selector: 'add-patient-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent {

  // define all complaints as name and is done false because no selected yet
  complaints: Array<Diagnostic> = [];
  errorMessage;

  constructor(private service: ComplaintService) {
    this.service.getComplaints().subscribe(
      data => {
        this.complaints = Utils.addIsDone(Utils.getNames(data))
        if (Utils.patient) {
          Utils.markSelected(Utils.patient.complaints, this.complaints);
        }
      },
      error => this.errorMessage = error
    );
  }


  /**
   * add exam to patient with select 
   * @param inspection 
   */
  public toggleComplaint(complaint: Diagnostic) {
    //toggle between selected or not
    complaint.isDone = !complaint.isDone;
  }

  /**
   * get all selected patient exams name only
   */
  public getPatientComplaints() {
    return Utils.getSelectedNames(this.complaints);
  }
}

