import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, Userschema } from './schemas/user.schemas';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3d' },
          // signOptions: {
          //   expiresIn: config.get<number | string>('JWT_EXPIRES'),
          // },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: Userschema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}