import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDateString, MaxLength, IsNumber, IsNotEmpty, Length } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Name of the patient', maxLength: 30 })

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly patientName: string;

    @ApiProperty({ description: 'Age of the patient' })
  @IsNumber()
  @IsNotEmpty()
  age:number;

  @ApiProperty({ description: 'Email address of the patient' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Phone number of the patient' })
    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number;
  
    @ApiProperty({ description: 'Preferred date for the appointment', example: '2024-09-16T10:30:00Z' })
    @IsDateString()
    @IsNotEmpty()
    preferredDate: string;
  
    @ApiProperty({ description: 'Preferred time for the appointment' })
    @IsString()
    @IsNotEmpty()
    preferredTime: string;
  
    @ApiProperty({ description: 'Name of the doctor' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    doctorName: string;
  
    @ApiProperty({ description: 'Symptoms described by the patient' })
    @IsString()
    @IsNotEmpty()
    symptoms: string;
  
    @ApiPropertyOptional({ description: 'Additional message from the patient' })
    @IsOptional()
    @IsString()
    message?: string;
}