import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Patient } from "src/app/models/Patient";
import { PatientService } from 'src/app/services/patient.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Utils from 'src/app/utils';

@Component({
  selector: 'show-patient',
  templateUrl: './show-patient.component.html',
  styleUrls: ['./show-patient.component.scss']
})
export class ShowPatientComponent {

  patient: Patient = new Patient();

  // handle all peculiar names only 
  habits = []; diseases = []; medicines = []; complaints = []; exams = [];

  // fill with all images gotten form backend 
  public patientImages: any = [];

  public dataReady = true;

  private showPatientData(patient: Patient) {
    this.patient = patient;
    this.complaints = this.getPatientPeculiar(patient.complaints);
    this.diseases = this.getPatientPeculiar(patient.diseases)
    this.medicines = this.getPatientPeculiar(patient.medicines)
    this.exams = this.getPatientPeculiar(patient.examinations)
    this.habits = this.getPatientPeculiar(patient.habits)
  }

  constructor(
    private patientService: PatientService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    // grap paramter from route snapshot (url);
    // note there drawback in this method using snapshot that snapshot not update
    let patientId = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    if (patientId) {
      this.getPatientData(patientId)
    }
  }

  /**
   * ----------------- Deprecated -----------------------
   * get all patient images only by patient id
   * @param patientId 
   */
  private getPatientImagesById(patientId: number) {
    this.patientService.getPatientImagesById(patientId).subscribe(
      images => this.patientImages = this.getImages(images),
      error => console.log(error))
  }

  /**
   * get all patient data images + details
   * @param patientId 
   */
  private getPatientData(patientId: number) {
    this.patientService.getPatientDataById(patientId).subscribe(
      (data: any) => {
        this.showPatientData(data['patient']);
        this.patientImages = this.getImages(data['images']);
      }, error => {
        alert("No Found Data For Defined Patient Id")
        this.dataReady = false;
        console.log(error);
      })
  }

  /**
   * get all images from recived object from back end 
   * get all images bytes form each image record
   * note each record has (name,picByte,type)
   * @param data : all objects inside one object
   */
  private getImages(images: any) {
    let tempImages = []
    if (images) {
      images.forEach((image: any) => tempImages.push('data:image/png;base64,' + image.picByte));
    }
    return tempImages;
  }

  private getPatientPeculiar(peculiars: any) {
    let temp = [];
    peculiars.forEach((peculiar: any) => {
      temp.push(peculiar.name);
    });
    return temp;
  }

  public deletePatientById(id: number) {
    let isDelete = confirm("Do You Sure To Delete Current Patient Data will errase all details and images")
    if (isDelete) {
      this.patientService.deletePatientById(id).then(
        deleted => {
          if (deleted) {
            alert('Patient Deleted successfully')
            // this.patient = null;
            // navigate to patients path after deleted is executed
            this.router.navigate(['patients'])
          } else {
            alert('Patient Not Deleted successfully')
          }
        })
    }
  }

  /**
   * when click update button call this method with patient object datat
   * to do the follow
   * fill Utils static property patient with data(patient object)
   * so this object will be shared for other components
   */
  public patientDetails(patient: Patient) {
    Utils.patient = patient;
  }


}
