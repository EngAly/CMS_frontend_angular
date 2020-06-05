import { Component, OnInit } from '@angular/core';
import { Diseases } from 'src/app/models/Diseases';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DiseaseService } from 'src/app/services/disease.service';

@Component({
  selector: 'app-add-disease',
  templateUrl: './add-disease.component.html',
  styleUrls: ['./add-disease.component.scss']
})
export class AddDiseaseComponent {

  disease = new Diseases();

  diseaseDataForm = new FormGroup({
    disease: new FormControl('', [Validators.required])
  });
  constructor(private service: DiseaseService) { }

  get diseaseControls() {
    return this.diseaseDataForm.controls;
  }

  /**
   * call service method that is responsible for migrate complaint data
   * from front end to backend then save it to database 
   */
  public saveDisease() {
    this.service.migrateDiseaseToServer(this.disease).then(
      saved => {
        if (saved) {
          alert('Disease Added successfully');
          this.disease.name = ""
        } else {
          alert('Disease not Added successfully May Be Disease Dubplicated');
        }
      }
    )
  }

}
