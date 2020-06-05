import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicine } from '../models/Medicine';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {


  private message: string;
  private url: string

  constructor(private http: HttpClient, private urlg: GlobalService) {
    this.url = this.urlg.getMedicineUrl();
  }

  public async migrateMedicineToServer(medicine: Medicine): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/addMedicine`, medicine, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status === 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(err)
      });
    return flag;
  }

  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.url}/medicines`)
  }
}
