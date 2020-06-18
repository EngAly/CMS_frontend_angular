import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './home/start/start.component';
import { AddPatientComponent } from './patientContent/add-patient/patient/add-patient.component';
import { ShowPatientComponent } from './patientContent/show-patient/show-patient.component';
import { AddComplaintComponent } from './complaintContent/add-complaint/add-complaint.component';
import { AddDiseaseComponent } from './diseaseContent/add-disease/add-disease.component';
import { AddMedicalComponent } from './medicalContent/add-medical/add-medical.component';
import { AddExamComponent } from './examContent/add-exam/add-exam.component';
import { ShowPatientsComponent } from './patientContent/show-patients/show-patients.component';
import { AddHabitComponent } from './habitContent/add-habit/add-habit.component';
import { HomeComponent } from './home/home/home.component';
import { GetByNameComponent } from './search/get-by-name/get-by-name.component';
import { GetByAgeComponent } from './search/get-by-age/get-by-age.component';
import { GetByDateComponent } from './search/get-by-date/get-by-date.component';
import { StatisticComponent } from './statistics/statistic/statistic.component';
import { RetrivedContextComponent } from './search/retrived-context/retrived-context.component';

/**
 * note :-
 * when you navigate to any page will start from upper to botom
 * so that does't put ** in starting array
 */
const routes: Routes = [
    /**
     * full => for like url exactly so that not similar with other urls
     * when url on root url will direct navigate to home path after that will
     * match each component to go it and walk view page.
     * so will redirect if and only if FULL path is empty
     * note you can use PREFIX instead of FULL but prefix has problem that any url has empty->
     * so that it will match any url so we use full
     */
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },


    { path: "add-patient", component: AddPatientComponent },
    { path: "add-complaint", component: AddComplaintComponent },
    { path: "add-disease", component: AddDiseaseComponent },
    { path: "add-medical", component: AddMedicalComponent },
    { path: "add-exam", component: AddExamComponent },
    { path: "add-habit", component: AddHabitComponent },

    // { path: "patient", component: ShowPatientComponent },
    { path: "patients", component: ShowPatientsComponent },
    { path: "patients/:id", component: ShowPatientComponent },

    // statistics
    { path: "patient/statistics/disease", component: StatisticComponent },
    { path: "patient/statistics/complaint", component: StatisticComponent },
    { path: "patient/statistics/medicine", component: StatisticComponent },
    { path: "patient/statistics/habit", component: StatisticComponent },
    { path: "patient/statistics/exam", component: StatisticComponent },

    // Search by some fields to show patient snippet details
    {
        path: 'patient',
        component: RetrivedContextComponent,
        children: [
            // { path: '', redirectTo: 'searchByName', pathMatch: 'full' },
            { path: 'searchByName', component: GetByNameComponent },
            { path: 'searchByAge', component: GetByAgeComponent },
            { path: 'searchByDate', component: GetByDateComponent },
        ]
    },

    // from search pages you can go to complete patient details + data
    { path: "patient/:id", redirectTo: "/patients/:id", pathMatch: "full" },

    // update section
    { path: "update-patient", component: AddPatientComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})



export class AppRoutingModule { }
export const routingComponent = [StartComponent, HomeComponent, StatisticComponent,
    ShowPatientComponent, ShowPatientsComponent,
    GetByNameComponent, GetByAgeComponent, GetByDateComponent,
    AddPatientComponent, AddComplaintComponent, AddDiseaseComponent, AddMedicalComponent,
    AddExamComponent, AddHabitComponent
]