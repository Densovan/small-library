import { Category } from '../schemas/book_schema';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly author: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please Enter correct cateogry' })
  readonly category: Category;
}
