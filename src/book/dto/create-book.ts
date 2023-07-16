import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Category } from '../schemas/book_schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @IsNotEmpty()
  @IsString()
  readonly author: string;
  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please Enter correct cateogry' })
  readonly category: Category;
}
