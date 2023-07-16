import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book_schema';
import { CreateBookDto } from './dto/create-book';
import { UpdateBookDto } from './dto/update-book';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  @Post()
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
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
