import { Component, OnInit, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'show-patient-images',
  templateUrl: './show-patient-images.component.html',
  styleUrls: ['./show-patient-images.component.scss']
})
export class ShowPatientImagesComponent{

  names: any = [];
  @Input() retrievedImages: any;
 
  constructor() {
   
    
  }
  ngOnInit() {
    // can access parent property here
    console.log(this.retrievedImages);
}

  /**
   * retrive patient data from server side that content 
   * patient data+ images
   */
  // getPatient() {
  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.serviceGet.retrivePatientDataFromServer().subscribe(
  //     (res: any) => {
  //       res.forEach((patient: any) => {
  //         this.retrievedImages.push('data:image/png;base64,' + image.picByte)
  //         // this.names.push(patient.exams.name);
  //       });
  //     });
  // }
}
