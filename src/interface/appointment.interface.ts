import { Document } from 'mongoose';

export interface IAppointment extends Document{
    readonly patientName: string;
    readonly age: number;
    readonly email: string;
    readonly phoneNumber: number;
    readonly preferredDate: string;
    readonly preferredTime: string;
    readonly doctorName: string;
    readonly symptoms: string;
    readonly message?: string;
    readonly status?: string;

}

