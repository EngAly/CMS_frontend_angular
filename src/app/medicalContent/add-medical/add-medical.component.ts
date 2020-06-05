import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Medicine } from 'src/app/models/Medicine';
import { MedicalService } from 'src/app/services/medical.service';


@Component({
  selector: 'app-add-medical',
  templateUrl: './add-medical.component.html',
  styleUrls: ['./add-medical.component.scss']
})
export class AddMedicalComponent {

  medical = new Medicine();

  medicalDataForm = new FormGroup({
    medical: new FormControl('', [Validators.required])
  });
  constructor(private medicalService: MedicalService) { }

  get medicalControls() {
    return this.medicalDataForm.controls;
  }

  /**
   * call service method that is responsible for migrate complaint data
   * from front end to backend then save it to database 
   */
  public saveMedical() {
    this.medicalService.migrateMedicineToServer(this.medical).then(
      saved => {
        if (saved) {
          alert('Medicine Added successfully')
          this.medical.name = "";
        }else{
          alert('Medicine not Added successfully May Be It Medicine')
        }
      }

    )
  }

}
