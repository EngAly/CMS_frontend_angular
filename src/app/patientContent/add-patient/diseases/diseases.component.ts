import { Component, OnInit, Output } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { DiseaseService } from 'src/app/services/disease.service';
import Utils from 'src/app/utils';


@Component({
  selector: 'add-patient-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent {

  // define all diseases as name and isdone false because no selected yet
  diseases: Array<Diagnostic> = [];

  // all diseases name that gotten from database diseases
  // public diseasesName = ["HTN", "ACS", "Asthma", "D.M", "Thyroid Dysfunction", "Hepatitis",
  //   'Hepatic Impairment', 'Renal Stones', 'Renal Impairment', 'Gastritis', 'Irritable Bowel',
  //   'Epilepsy', 'MND', 'Peripheral Neuritis', 'Others'];
  errorMessage;

  constructor(private service: DiseaseService) {
    this.service.getDiseases().subscribe(
      data => {
        this.diseases = Utils.addIsDone(Utils.getNames(data))
        if (Utils.patient) {
          Utils.markSelected(Utils.patient.diseases, this.diseases)
        }
      },
      error => this.errorMessage = error
    );
  }



  /**
   * add selected diseases to patient details to database  
   * @param ailment 
   */
  public toggleAilment(ailment) {
    //toggle between selected or not
    ailment.isDone = !ailment.isDone;
  }

  /**
   * get all selected patient diseases name only
   */
  public getPatientDiseases() {
    return Utils.getSelectedNames(this.diseases);
  }
}
