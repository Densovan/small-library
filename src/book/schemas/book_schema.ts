import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schemas';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  price: number;
  @Prop()
  category: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
