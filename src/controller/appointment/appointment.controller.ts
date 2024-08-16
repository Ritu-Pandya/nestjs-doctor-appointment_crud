import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/dto/update-appointment.dto';
import { AppointmentService } from 'src/service/appointment/appointment.service';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }
    @Post()
    async createAppointment(@Res() response, @Body() createAppointmentDto: CreateAppointmentDto) {
        try {
          const newAppointment = await this.appointmentService.createAppointment(createAppointmentDto);
          return response.status(HttpStatus.CREATED).json({
          message: 'Appointment has been created successfully',
          newAppointment,});
       } catch (err) {
          return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: Appointment not created!',
          error: 'Bad Request'
       });
       }
      }

      @Get()
        async getAllAppointments(@Res() response) {
        try {
            const appointmentData = await this.appointmentService.getAllAppointments();
            return response.status(HttpStatus.OK).json({
            message: 'All appointment data found successfully',appointmentData,});
            } catch (err) {
            return response.status(err.status).json(err.response);
          }
        }

        @Get('/:id')
        async getAppointment(@Res() response,@Param('id') appointmentId:string){
           try{
              const appointment = await this.appointmentService.getAppointment(appointmentId);
              return response.status(HttpStatus.OK).json({
                 message:'Appointment found successfully',appointment,})
                
           } 
           catch (err) {
                   return response.status(err.status).json(err.response);
                 }
              
           }

        @Put('/:id')
            async updateAppointment(@Res() response,@Param('id') appointmentId: string,
            @Body() updateAppointmentDto: UpdateAppointmentDto) {
            try {
                const existingAppointment = await this.appointmentService.updateAppointment(appointmentId, updateAppointmentDto);
                return response.status(HttpStatus.OK).json({
                message: 'Appointment has been successfully updated',
                existingAppointment,});
                } catch (err) {
                return response.status(err.status).json(err.response);
                }
            }

            @Delete('/:id')
            async deleteAppointment (@Res() response, @Param('id') appointmentId: string )
            {
               try {
                  const deletedAppointment = await this.appointmentService.deleteAppointment(appointmentId);
                  return response.status(HttpStatus.OK).json({
                  message: 'Appointment deleted successfully',deletedAppointment,});
                }catch (err) {
                  return response.status(err.status).json(err.response);
                }
            }

}
