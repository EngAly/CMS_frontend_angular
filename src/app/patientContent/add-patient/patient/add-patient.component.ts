import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { Patient } from 'src/app/models/Patient';
import { Diseases } from 'src/app/models/Diseases';
import { Medicine } from 'src/app/models/Medicine';
import { Examination } from 'src/app/models/Examination';
import { ComplaintComponent } from '../complaint/complaint.component';
import { Complaints } from 'src/app/models/Complaints';

// Components
import { DiseasesComponent } from '../diseases/diseases.component';
import { MedicalsComponent } from '../medicals/medicals.component';
import { ExamsComponent } from '../exams/exams.component';
import { ImagesComponent } from '../images/images.component';

//  Services
import { PatientService } from 'src/app/services/patient.service';
import Utils from 'src/app/utils';
import { HabitsComponent } from '../habits/habits.component';



@Component({
  selector: 'add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})

/**
 * FormGroup aggregates the values of each child FormControl into one object,
 * with each control name as the key.
 */
export class AddPatientComponent {

  array: any[] = [];
  patient = new Patient();
  isReportInvalid: boolean = true;

  // create instance from all models classes
  diseases = new Diseases();
  medicines = new Medicine();
  exams = new Examination();
  complaints = new Complaints();

  // Call All Childs To Handle Data From Them
  @ViewChild(DiseasesComponent) diseasesValue: any
  @ViewChild(MedicalsComponent) medicinesValue: any;
  @ViewChild(ExamsComponent) examsValue: any;
  @ViewChild(HabitsComponent) habitValue: any;
  @ViewChild(ImagesComponent) imagingValue: any;
  @ViewChild(ComplaintComponent) complaintValues: any;

  constructor(private patientService: PatientService) {
    if (Utils.patient) {
      this.patient = Utils.patient;
      this.patientDataForm.patchValue({
        gender: this.patient.gender, maritalStatus: this.patient.maritalStatus,
        occupation: this.patient.occupation, ttttPlane: this.patient.ttttPlane,
        operations: this.patient.operations
      })
    }
  }

  patientDataForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    childrenNo: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    registerdate: new FormControl('', [Validators.required]),
    followUpDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    ttttPlane: new FormControl('', [Validators.required]),
    operations: new FormControl('', [Validators.required]),
    allergy: new FormControl('', [Validators.required]),
    report: new FormControl('', [Validators.required]),
    examCost: new FormControl('', [Validators.required]),
    slapCost: new FormControl('', [Validators.required]),
    followUpCost: new FormControl('', [Validators.required]),
    operativeCost: new FormControl('', [Validators.required])
  })

  // return all controls in patient input, list, radio buttons, ... etc
  get patientControls() {
    return this.patientDataForm.controls;
  }

  public handleMaritalChange(event) {
    this.patient.maritalStatus = this.patientDataForm.get('maritalStatus').value;
  }

  //sync radio ui with gender field
  public handleGenderChange(event) {
    this.patient.gender = this.patientDataForm.get('gender').value;
  }

  public handleOccupationChange(event) {
    this.patient.occupation = this.patientDataForm.get('occupation').value;
  }

  public handleTTTTPlaneChange(event) {
    this.patient.ttttPlane = this.patientDataForm.get('ttttPlane').value;
  }

  public handleOperationsChange(event) {
    this.patient.operations = this.patientDataForm.get('operations').value;
  }

  public handleAllergyChange(event) {
    this.patient.allergy = this.patientDataForm.get('allergy').value;
  }

  public handleComplaints() {
    this.patient.complaints = this.complaintValues.getPatientComplaints();
    console.log(this.patient.complaints);
  }

  public handleDiseases() {
    this.patient.diseases = this.diseasesValue.getPatientDiseases();
    console.log(this.patient.diseases);
  }

  public handleMedicines() {
    this.patient.medicines = this.medicinesValue.getPatientMedicals();
    console.log(this.patient.medicines);
  }

  public handleExams() {
    this.patient.examinations = this.examsValue.getPatientExams();
    console.log(this.patient.examinations);
  }

  public handleHabits() {
    this.patient.habits = this.habitValue.getPatientHabits();
    console.log(this.patient.habits);
  }

  /**
   * save patient details or data
   * details is patient information only without any images 
   * data is patient details + patient images
   * there two way
   * the first 
   * if there previous images in patientData form append patient details with it
   * the second 
   * if no there previous images in patientData form so it send patient details only to server
   */
  public savePatient() {
    console.log(this.patient);

    //  create new FormData instance that is equivalent to an HTML form 
    // sent using the multipart/form-data encoding.
    let patientData: FormData;

    // test if patientData has previous data (i.e images)
    // so if images is found will call endpoint that has images + patientDetails
    if (this.imagingValue.imagesToUpload()) {
     
      // get all images inserted in patientData form to append patient detials with it
      patientData = this.imagingValue.imagesToUpload();

      // make patient details(this.patient) object as stream to append it in formData
      var patient = new Blob([JSON.stringify(this.patient)], { type: "application/json" })

      // append patient details to patientData
      patientData.append("patient", patient);

      // call service that reponsible for sending patient images + details to server
      this.patientService.migratePatientDataToServer(patientData);
    }

    // if formData not has previous data so it not found so we call other
    else {

      // call service that reponsible for sending patientDetails only to server
      this.patientService.migratePatientDetailsToServer(this.patient);
    }
  }
}