import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/dto/update-appointment.dto';
import { IAppointment } from 'src/interface/appointment.interface';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel('Appointment') private appointmentModel:Model<IAppointment>) { }
    async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<IAppointment> {
        const newAppointment = await new this.appointmentModel(createAppointmentDto);
        return newAppointment.save();
     }

     async getAllAppointments(): Promise<IAppointment[]> {
        const appointmentData = await this.appointmentModel.find();
        if (!appointmentData || appointmentData.length == 0) {
            throw new NotFoundException('Appointments data not found!');
        }
        return appointmentData;
    }
    async getAppointment(appointmentId: string): Promise<IAppointment> {
        const existingAppointment = await this.appointmentModel.findById(appointmentId).then();
        if (!existingAppointment) {
         throw new NotFoundException(`Appointment #${appointmentId} not found`);
        }
        return existingAppointment;
     }
     async updateAppointment(appointmentId: string, updateAppointmentDto: UpdateAppointmentDto): Promise<IAppointment> {
        const existingAppointment = await this.appointmentModel.findByIdAndUpdate(appointmentId, updateAppointmentDto, { new: true });
       if (!existingAppointment) {
         throw new NotFoundException(`Appointment #${appointmentId} not found`);
       }
       return existingAppointment;
    }
    async deleteAppointment(appointmentId: string): Promise<IAppointment> {
        const deletedAppointment = await this.appointmentModel.findByIdAndDelete(appointmentId);
       if (!deletedAppointment) {
         throw new NotFoundException(`Appointment #${appointmentId} not found`);
       }
       return deletedAppointment;
    }
}
