import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import {join} from 'path';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    index: false,
    prefix: '/uploads'
  });

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on part ${port}`);
}

bootstrap();
