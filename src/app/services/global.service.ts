import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private rootUrl: string = "http://localhost:8088/cms-1.0/patient";

  getRootUrl() {
    return this.rootUrl;
  }

  getCompalintUrl() {
    return this.rootUrl + "/complaint";
  }

  getMedicineUrl() {
    return this.rootUrl + "/medicine";
  }

  getDiseaseUrl() {
    return this.rootUrl + "/disease";
  }

  getExamUrl() {
    return this.rootUrl + "/exam";
  }

  getHabitUrl(){
    return this.rootUrl + "/habit";
  }
}
