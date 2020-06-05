import { Component, OnInit } from '@angular/core';
import { Habits } from 'src/app/models/Habits';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HabitService } from 'src/app/services/habit.service';

@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.component.html',
  styleUrls: ['./add-habit.component.scss']
})
export class AddHabitComponent {
  habit = new Habits();

  habitDataForm = new FormGroup({
    habit: new FormControl('', [Validators.required])
  });
  constructor(private service: HabitService) { }

  get habitControls() {
    return this.habitDataForm.controls;
  }

  /**
   * call service method that is responsible for migrate complaint data
   * from front end to backend then save it to database 
   */
  public saveHabit() {
    this.service.migrateHabitToServer(this.habit).then(
      saved => {
        if (saved) {
          alert('Habit Added successfully')
          this.habit.name = "";
        } else {
          alert('Habit not Added successfully May Be Habit Dubplicated')
        }
      }
    )
  }

}
