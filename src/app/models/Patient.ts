import { Diseases } from './Diseases';
import { Medicine } from './Medicine';
import { Examination } from './Examination'
import { Complaints } from './Complaints';
import { Habits } from './Habits';

export class Patient {
    id: number;
    fullName: string;
    age: number;
    numberOfChildren: number;
    gender: string;
    maritalStatus: string;
    occupation: string;
    ttttPlane: string;
    operations: string;
    allergy: string;
    report: string;
    examCost: number;
    slapCost: number;
    followUpCost: number;
    operativeCost: number;
    dateOfBirth: Date;
    dateOfRegistration: Date;
    dateOfFollowUp: Date;

    // models for other shared tables
    diseases: Diseases[];
    medicines: Medicine[]
    examinations: Examination[];
    complaints: Complaints[];
    habits: Habits[];
}