import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { MedicalService } from 'src/app/services/medical.service';
import Utils from 'src/app/utils';

@Component({
  selector: 'add-patient-medicals',
  templateUrl: './medicals.component.html',
  styleUrls: ['./medicals.component.scss']
})
export class MedicalsComponent {

  // define all diseases as name and isdone false because no selected yet
  medicals: Array<Diagnostic> = [];
  private errorMessage: string;

  // medicals = ["Corticosteroids", "Hypoglycemic", "Antihypertensive", "Hepatic support", "Others"];
  constructor(private service: MedicalService) {
    this.service.getMedicines().subscribe(
      data => {
        this.medicals = Utils.addIsDone(Utils.getNames(data))
        if (Utils.patient) {
          Utils.markSelected(Utils.patient.medicines, this.medicals);
        }
      },
      error => this.errorMessage = error
    );
  }

  /**
   * toggle between select medical or not
   * @param medical: gotten from <li> for each element
   */
  public toggleMedical(medical) {
    //toggle between selected or not
    medical.isDone = !medical.isDone;
  }

  /**
   * get all selected patient medicals name only
   */
  public getPatientMedicals() {
    return Utils.getSelectedNames(this.medicals);
  }

}