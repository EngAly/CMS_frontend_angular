import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Examination } from '../models/Examination';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private url: string;
  private message: string;

  constructor(private http: HttpClient, private urlg: GlobalService) {
    this.url = this.urlg.getExamUrl();
  }


  public async migrateExamToServer(exam: Examination): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/addExam`, exam, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status === 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(err);
      })
    return flag;
  }

  getExams(): Observable<Examination[]> {
    return this.http.get<Examination[]>(`${this.url}/exams`)
  }
}
