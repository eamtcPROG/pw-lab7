import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { MongooseModule } from '@nestjs/mongoose';

import UserModule from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CommonTools } from 'src/app/tools/commontools';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_ACCESS_SECRET}`,
      signOptions: { expiresIn: '1d' },
    }),

    forwardRef(() => AppModule),
    forwardRef(() => UserModule),

    HttpModule.register({}),

    MongooseModule.forFeature([]),
  ],
  controllers: [],
  providers: [
    AuthService,
    AccessTokenStrategy,
    JwtService,
    CommonTools,
    ConfigService,
  ],
  exports: [AuthService],
})
export default class AuthModule {}
