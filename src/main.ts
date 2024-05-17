import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SentryInterceptor } from 'src/app/interceptors/sentry.interceptor';
import { HeaderInterceptor } from 'src/app/interceptors/header.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../static'));
  app.useGlobalInterceptors(new SentryInterceptor(), new HeaderInterceptor());
  const configService = app.get(ConfigService);
  const port: number | undefined = configService.get('PORT');
  if (port == undefined) throw new Error('PORT is not defined in .env file');
  const version: string = configService.get('version') ?? '1.0';
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API for PW lab 7')
    .setDescription('API description')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
