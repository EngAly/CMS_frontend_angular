import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Patient } from '../models/Patient';
import { SearchedFields } from '../models/SearchedFields';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private patient = new Subject<Patient[]>();

  fields: SearchedFields;

  constructor() {
    this.fields = { name: "", startAge: 0, endAge: 0, startDate: '', endDate: '' }
  }

  setPatient(patient: Patient[]) {
    // console.log(patient)
    this.patient.next(patient);
  }

  getPatient(): Observable<Patient[]> {
    return this.patient.asObservable();
  }

  clearPatient(){
    this.patient.next();
  }

  cachePatientName(name: string) {
    this.fields.name = name;
  }

  retrivePatientName() {
    return this.fields.name;
  }

  cacheStartAge(start: number) {
    this.fields.startAge = start;
  }

  cacheEndAge(end: number) {
    this.fields.endAge = end;
  }

  retriveStartAge() {
    return this.fields.startAge
  }

  retriveEndAge() {
    return this.fields.endAge;
  }

  cacheStartDate(start: string) {
    this.fields.startDate = start;
  }

  cacheEndDate(end: string) {
    this.fields.endDate = end;
  }

  retriveStartDate() {
    return this.fields.startDate
  }

  retriveEndDate() {
    return this.fields.endDate;
  }

}
