import { IsString, IsEmail, IsOptional, IsDateString, MaxLength, IsNumber, IsNotEmpty, Length } from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly patientName: string;
  @IsNumber()
  @IsNotEmpty()
  age:number;
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number;
  
    @IsDateString()
    @IsNotEmpty()
    preferredDate: string;
  
    @IsString()
    @IsNotEmpty()
    preferredTime: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    doctorName: string;
  
    @IsString()
    @IsNotEmpty()
    symptoms: string;
  
    @IsOptional()
    @IsString()
    message?: string;
}