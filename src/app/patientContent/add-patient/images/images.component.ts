import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-patient-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})

/**
  * -------------------- FormGroup ------------------------------
  * The FormGroup is a collection of FormControls It Tracks the value
  * and validity state of a group of FormControl instances.
  * The FormGroup is one of the building blocks of the angular forms.
  * 
  * -------------------- FormControl ------------------------------
  * It is a class that is used to get and set values and validation
  * of a form control such as <input> and <select> tag. Tracks the value
  * and validation status of an individual form control.
  * parameters init input value, array of validators
  * example=> report: new FormControl('init value', [Validators.required, Validators.minLength(3)])
  */

export class ImagesComponent {

  selectedFiles: File[];

  public imagesForm = new FormGroup({
    images: new FormControl()
  });

  constructor() { }

  /**
   * return object of all form controls to use in validation in form in html page
   */
  get patientReportControls() {
    return this.imagesForm.controls;
  }

  /**
   * Gets called when the user selects an images
   * @param event: that can handle all images via it
   */
  onFileChange(event) {
    if (event.target.files) {
      this.selectedFiles = event.target.files;
    }
  }

  /**
   *  Gets called when the user clicks on submit to upload the image
   * ---------------------------FormData----------------------------
   * API provides methods and properties to allow us easily prepare
   * form data to be sent with POST HTTP requests.
   */
  public imagesToUpload(): FormData {
    if (this.selectedFiles) {
      const uploadImageData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
      uploadImageData.append('file', this.selectedFiles[i], this.selectedFiles[i].name);
      }
      return uploadImageData;
    }
  }
}
/**
 * -------------------- Project Notes
 * 1) difference between Setvalue and Patchvalue
 * Setvalue and Patchvalue are methods from the Angular Formgroup.
 * They both set/update the value of a control in a formgroup.
 * The clear difference is that setvalue cannot exclude some controls
 * while the patchvalue is able to do just that.
 * example=> this.myForm.patchValue({ fileSource: this.images });
 *
 *
 */