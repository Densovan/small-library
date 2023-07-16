import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { signInDto } from './dto/signin.dts';

type message = {
  token: string;
  message: string;
};
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //=======signup============
  @Post('/signup')
  // @UsePipes(new ValidationPipe())
  signup(@Body() signup: signUpDto): Promise<{ message: message }> {
    return this.authService.signup(signup);
  }
  //==========signin==========
  @Post('/signin')
  // @UsePipes(new ValidationPipe())
  sigin(@Body() signin: signInDto): Promise<{ message: message }> {
    return this.authService.signin(signin);
  }
}
