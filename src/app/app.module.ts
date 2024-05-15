import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import configuration from '../config/configuration';

import Idto from './interfaces/idto.interface';
import Ischema from './interfaces/ischema.interface';

import { CommonTools } from './tools/commontools';
import UserModule from 'src/user/user.module';
import AuthModule from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),

    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@transport.cumran5.mongodb.net/${process.env.DATABASE_DBNAME}?retryWrites=true&w=majority`,
      {},
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Idto, Ischema, CommonTools],
  exports: [],
})
export class AppModule {}
