import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schemas/book_schema';
import { User } from '../../auth/schemas/user.schemas';

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
  @IsEmpty({ message: 'you cannot pass user id' })
  readonly user: User;
}
