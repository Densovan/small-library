import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;
  @Prop({ unique: [true, 'Duplicated email entered'] })
  email: string;
  @Prop()
  password: string;
}

export const Userschema = SchemaFactory.createForClass(User);