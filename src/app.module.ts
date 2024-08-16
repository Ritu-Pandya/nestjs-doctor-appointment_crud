import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from './schema/appointment.schema';
import { AppointmentService } from './service/appointment/appointment.service';
import { AppointmentController } from './controller/appointment/appointment.controller';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'DoctorAppointment'}),  
    MongooseModule.forFeature([{ name: 'Appointment', schema: AppointmentSchema }])],
  controllers: [AppController,AppointmentController],
  providers: [AppService,AppointmentService],
})
export class AppModule {}
