import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { signUpDto } from './dto/signup.dto';
// import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtservice: JwtService,
  ) {}

  //=========>>sign up<<==============
  async signup(signup: signUpDto): Promise<{ token: string }> {
    const { name, email, password } = signup;
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtservice.sign({ id: user._id });
    return { token };
  }
}
