import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Habits } from '../models/Habits';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private message: string;
  private url: string

  constructor(private http: HttpClient, private urlg: GlobalService) {
    this.url = this.urlg.getHabitUrl();
  }

  public async migrateHabitToServer(habits: Habits): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/addHabit`, habits, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status === 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(err)
      })
    return flag;
  }

  getHabits(): Observable<Habits[]> {
    return this.http.get<Habits[]>(`${this.url}/habits`);
  }

}
