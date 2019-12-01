import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  // 'config library' select file by NODE_ENV environment variable
  // if NODE_ENV not specified 'config library' take development.yml that mixed with default.yml
  // for production NODE_ENV=production npm run start
  const port = process.env.port || serverConfig.port;

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin ${serverConfig.origin}`);
  }

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
