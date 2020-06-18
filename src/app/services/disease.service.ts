import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Diseases } from '../models/Diseases';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {


  private message: string;
  private url: string;

  constructor(private http: HttpClient, private urlg: GlobalService) {
    this.url = this.urlg.getDiseaseUrl();
  }

  public async migrateDiseaseToServer(disease: Diseases): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/addDisease`, disease, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status === 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(flag)
      });
    return flag;
  }

  getDiseases(): Observable<Diseases[]> {
    return this.http.get<Diseases[]>(`${this.url}/diseases`)
  }

}
