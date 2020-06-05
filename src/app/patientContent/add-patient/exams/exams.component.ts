import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { ExamService } from 'src/app/services/exam.service';
import Utils from 'src/app/utils';

@Component({
  selector: 'add-patient-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent {

  // define all exams as name and isdone false because no selected yet
  exams: Array<Diagnostic> = [];

  // all diseases name that gotten from database diseases
  // public exams = ["Look", "See", "Move", "Test", "Joint", "NV"];
  errorMessage;

  constructor(private service: ExamService) {
    this.service.getExams().subscribe(
      data => {
        this.exams = Utils.addIsDone(Utils.getNames(data))
        if (Utils.patient) {
          Utils.markSelected(Utils.patient.examinations, this.exams);
        }
      },
      error => this.errorMessage = error
    );
  }

  /**
   * add exam to patient with select 
   * @param inspection 
   */
  public toggleAilment(inspection) {
    //toggle between selected or not
    inspection.isDone = !inspection.isDone;
  }

  /**
   * get all selected patient exams name only
   */
  public getPatientExams() {
    return Utils.getSelectedNames(this.exams);
  }
}