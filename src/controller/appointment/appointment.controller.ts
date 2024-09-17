import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/dto/update-appointment.dto';
import { AppointmentService } from 'src/service/appointment/appointment.service';

@ApiTags('Appointments')

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Post()
    @ApiOperation({ summary: 'Create an appointment' })
    @ApiResponse({ status: 201, description: 'The appointment has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
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

      @ApiOperation({ summary: 'Get all appointments' })
      @ApiResponse({ status: 200, description: 'Return all appointments.' })
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
        @Get(':id')
        @ApiOperation({ summary: 'Get an appointment by ID' })
        @ApiResponse({ status: 200, description: 'Return the appointment.' })
        @ApiResponse({ status: 404, description: 'Appointment not found.' })
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
           @Put(':id')
           @ApiOperation({ summary: 'Update an appointment by ID' })
           @ApiResponse({ status: 200, description: 'The appointment has been successfully updated.' })
           @ApiResponse({ status: 404, description: 'Appointment not found.' })
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

            @Delete(':id')
            @ApiOperation({ summary: 'Delete an appointment by ID' })
            @ApiResponse({ status: 200, description: 'The appointment has been successfully deleted.' })
            @ApiResponse({ status: 404, description: 'Appointment not found.' })
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
