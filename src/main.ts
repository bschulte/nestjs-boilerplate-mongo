import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('source-map-support').install();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.port || 5555);
}

bootstrap();
