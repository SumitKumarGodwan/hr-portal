/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './common/config';
import { DataBaseModule } from './common/database/database.module';
import { LoginPortalModule } from './modules/login/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: true
    }),
    DataBaseModule,
    LoginPortalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
