import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private rootUrl: string = "http://localhost:8088/cms/patient";
  // private rootUrl: string = "http://localhost:8080/patient";

  constructor(private http: HttpClient) {
  }

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

  getHabitUrl() {
    return this.rootUrl + "/habit";
  }

  public getStatistics(peculiar: string): Observable<object> {
    return this.http.get(`${this.getRootUrl()}/${peculiar}/statistics`);
  }

}
