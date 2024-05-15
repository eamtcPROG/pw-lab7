import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppModule } from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';

import { UserRepository } from 'src/user/repositories/user.repository';

import { UserSchema } from 'src/user/schemas/user.schema';

import { UserService } from 'src/user/services/user.service';

import { UserController } from 'src/user/controllers/user.controller';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    forwardRef(() => AppModule),

    HttpModule.register({}),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, CommonTools],
  exports: [UserRepository, UserService],
})
export default class UserModule {}
