import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { HabitService } from 'src/app/services/habit.service';
import Utils from 'src/app/utils';

@Component({
  selector: 'add-patient-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent {

  // define all complaints as name and is done false because no selected yet
  habits: Array<Diagnostic> = [];
  errorMessage: string;

  constructor(private service: HabitService) {
    this.service.getHabits().subscribe(
      data => {
        this.habits = Utils.addIsDone(Utils.getNames(data))
        if (Utils.patient) {
          Utils.markSelected(Utils.patient.habits, this.habits);
        }
      },
      error => this.errorMessage = error
    );
  }


  /**
   * add exam to patient with select 
   * @param inspection 
   */
  public toggleHabit(habit: Diagnostic) {
    //toggle between selected or not
    habit.isDone = !habit.isDone;
  }

  /**
   * get all selected patient exams name only
   */
  public getPatientHabits() {
    return Utils.getSelectedNames(this.habits);
  }
}


