import { Injectable } from '@angular/core';
import { Complaints } from '../models/Complaints';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private url: string

  constructor(private http: HttpClient, private urlg: GlobalService) {
    this.url = this.urlg.getCompalintUrl();
  }

  public async migrateCompalintToServer(complaint: Complaints): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/addComplaint`, complaint, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status === 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(err)
      })
    return flag
  }

  // private url1 = "assets/employees.json";
  // getEmployees(): Observable<IEmployee[]> {
  //   return this.http.get<IEmployee[]>(this.url1)
  //     .pipe(
  //       retry(1), catchError(error => { return throwError(error.message) }
  //       ));
  // }

  getComplaints(): Observable<Complaints[]> {
    return this.http.get<Complaints[]>(`${this.url}/complaints`);
  }

}
