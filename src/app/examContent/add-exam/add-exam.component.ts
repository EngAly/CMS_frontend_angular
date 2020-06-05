import { Component, OnInit } from '@angular/core';
import { Examination } from 'src/app/models/Examination';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent {

  exam = new Examination();

  examDataForm = new FormGroup({
    exam: new FormControl('', [Validators.required])
  });
  constructor(private examService: ExamService) { }

  get examControls() {
    return this.examDataForm.controls;
  }

  /**
   * call service method that is responsible for migrate complaint data
   * from front end to backend then save it to database 
   */
  public saveExam() {
    this.examService.migrateExamToServer(this.exam).then(
      saved => {
        if (saved) {
          alert('Exam Added successfully')
          this.exam.name = "";
        } else {
          alert('Exam not Added successfully May Be Exam Dubplicated')
        }
      })
  }

}
