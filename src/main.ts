/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: any = await configuration();
  console.log(config);
  await app.listen(3000);
}
bootstrap();
