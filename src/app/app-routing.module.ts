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
    { path: "home", component: StartComponent },


    { path: "add-patient", component: AddPatientComponent },
    { path: "add-complaint", component: AddComplaintComponent },
    { path: "add-disease", component: AddDiseaseComponent },
    { path: "add-medical", component: AddMedicalComponent },
    { path: "add-exam", component: AddExamComponent },
    { path: "add-habit", component: AddHabitComponent },

    // { path: "patient", component: ShowPatientComponent },
    { path: "patients", component: ShowPatientsComponent },
    { path: "patients/:id", component: ShowPatientComponent },


    { path: "update-patient", component: AddPatientComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})



export class AppRoutingModule { }
export const routingComponent = [StartComponent,
    ShowPatientComponent, ShowPatientsComponent,
    AddPatientComponent, AddComplaintComponent, AddDiseaseComponent, AddMedicalComponent,
    AddExamComponent, AddHabitComponent
]