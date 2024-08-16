import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({timestamps:true})
export class AppointmentInquiry{
    @Prop({ required: true })
    patientName: string;
    @Prop({ required: true })
    age: number;
    @Prop({ required: true })
    email: string;
  
    @Prop({ required: true })
    phoneNumber: number;
    @Prop({ required: true })
  preferredDate: string;

  @Prop({ required: true })
  preferredTime: string;

  @Prop({ required: true })
  doctorName: string;
  @Prop({ required: true })
  symptoms: string;

  @Prop()
  message?: string;

  @Prop({ default: 'Pending' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(AppointmentInquiry);
