import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// created component
import { ShowPatientImagesComponent } from './patientContent/show-patient-images/show-patient-images.component';
import { DiseasesComponent } from './patientContent/add-patient/diseases/diseases.component';
import { MedicalsComponent } from './patientContent/add-patient/medicals/medicals.component';
import { ExamsComponent } from './patientContent/add-patient/exams/exams.component';
import { ImagesComponent } from './patientContent/add-patient/images/images.component';
import { ComplaintComponent } from './patientContent/add-patient/complaint/complaint.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { ShowPatientsComponent } from './patientContent/show-patients/show-patients.component';
import { HabitsComponent } from './patientContent/add-patient/habits/habits.component';
import { AddHabitComponent } from './habitContent/add-habit/add-habit.component';
import { HomeComponent } from './home/home/home.component';
import { RetrivedContextComponent } from './search/retrived-context/retrived-context.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DiseasesComponent,
    MedicalsComponent,
    ExamsComponent,
    ImagesComponent,
    ComplaintComponent,
    ShowPatientImagesComponent,
    routingComponent,
    ShowPatientsComponent,
    HabitsComponent,
    AddHabitComponent,
    HomeComponent,
    RetrivedContextComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
