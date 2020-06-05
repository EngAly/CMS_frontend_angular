import { Component, OnInit } from '@angular/core';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor() { }

  eraseLastPatient() {
    Utils.patient = null;
  }

}
