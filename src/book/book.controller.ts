import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book_schema';
import { CreateBookDto } from './dto/create-book';
import { UpdateBookDto } from './dto/update-book';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  //===========get all books=============
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  //===========get book by id=============
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  //===========create book=============
  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req: any,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  //===========update book=============
  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    update_Book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBookById(id, update_Book);
  }
}
