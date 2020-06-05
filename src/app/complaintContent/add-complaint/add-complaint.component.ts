import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Complaints } from 'src/app/models/Complaints';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent {

  // to store sync it with complaint input field
  complaint = new Complaints();

  complaintDataForm = new FormGroup({
    complaint: new FormControl('', [Validators.required])
  });

  constructor(private complaintService: ComplaintService) { }

  get complaintControls() {
    return this.complaintDataForm.controls;
  }

  /**
   * call service method that is responsible for migrate complaint data
   * from front end to backend then save it to database 
   */
  public saveComplaint() {

    this.complaintService.migrateCompalintToServer(this.complaint).then(
      saved => {
        if (saved) {
          alert('Complaint Added successfully');
          this.complaint.name = "";
        }
        else {
          alert('Complaint not Added successfully May Be Complaint Dubplicated');
        }
      }
    )
  }


}
