import {
  HttpException,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { signUpDto } from './dto/signup.dto';
// import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/signin.dts';

type message = {
  token: string;
  message: string;
};
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtservice: JwtService,
  ) {}

  //=========>>sign up<<==============
  async signup(signup: signUpDto): Promise<{ message: message }> {
    const { name, email, password } = signup;
    const existEmail: string | null = await this.userModel.findOne({ email });
    if (existEmail) {
      throw new HttpException(
        'this email already exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtservice.sign({ id: user._id });
    return {
      message: {
        token: token,
        message: 'singup successfully',
      },
    };
  }

  //===========login=============
  async signin(signin: signInDto): Promise<{ message: message }> {
    const { email, password } = signin;
    const existEmail: any = await this.userModel.findOne({
      email,
    });
    if (!existEmail) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }
    const passwordCompare = await bcrypt.compare(password, existEmail.password);
    if (!passwordCompare) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }
    const token = this.jwtservice.sign({ id: existEmail._id });
    return {
      message: {
        message: 'signin successfully',
        token: token,
      },
    };
  }
}
