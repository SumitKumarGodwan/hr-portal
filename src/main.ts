/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './common/config';
import { StandardResponseInterceptor } from './common/interceptor/request-response.interceptor';
import { corsOptions } from './common/cors';
import { setContext } from './common/middleware/context.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("portal");
  app.enableCors(corsOptions);
  app.use(setContext)
  app.useGlobalInterceptors(new StandardResponseInterceptor())
  const config: any = await configuration();
  console.log(config);
  await app.listen(3000);
}
bootstrap();
