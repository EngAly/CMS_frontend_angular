import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private message: string;

  private url: string;

  constructor(private http: HttpClient, private urlg: GlobalService) {
    this.url = this.urlg.getRootUrl();
  }

  /**
   * collect all patient data and send it to server side to add new patient to database
   * @param patientData : patient details + images
   */
  public migratePatientDataToServer(patientData: FormData) {
    this.http.post(`${this.url}/addPatientData`, patientData, { observe: 'response' })
      .subscribe(response => {
        if (response.status === 200) {
          this.message = 'Patient Added successfully';
          alert(this.message)
          console.log(this.message);
        } else {
          this.message = 'Patient not Added successfully';
          alert(this.message)
          console.log(this.message);
        }
      }
        , err => {
          this.message = 'Patient not Added successfully';
          alert(this.message)
        });
  }

  /**
   * @param patientDetails : patient details without images
   */
  public migratePatientDetailsToServer(patientDetails: Patient) {
    this.http.post(`${this.url}/addPatientDetails`, patientDetails, { observe: 'response' })
      .subscribe(response => {
        if (response.status === 200) {
          this.message = 'Patient Added/Updated successfully';
          alert(this.message);
          console.log(this.message);
        } else {
          this.message = 'Patient not Added successfully';
          alert(this.message);
          console.log(this.message);
        }
      }, err => {
        this.message = 'Patient not Added successfully';
        console.log(err);
        alert(this.message);
      });
  }

  /**
 * API to get patient images through its id
 */
  public getPatientDataById(id: number) {
    return this.http.get(`${this.url}/getPatientData/${id}`);
  }

  public getPatientImagesById(id: number) {
    return this.http.get(`${this.url}/patientImagesById/${id}`);
  }

  // getPatients(): Observable<Patient[]> {
  //   return this.http.get<Patient[]>(`${this.url}/patients`)
  // }

  getPatientPage(pageSize: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/patientPage?page=` + pageSize)
  }

  async deletePatientById(id: number): Promise<boolean> {
    let flag: boolean = false;
    await this.http.delete(`${this.url}/deletePatient/${id}`, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status === 200 ? flag = true : flag
      }).catch((err) => {
        flag = false;
      });
    return flag;
  }

  /**
   * api for test only
   */
  private getPatientList(): Observable<any> {
    return this.http.get("assets/test.json");
  }

}
