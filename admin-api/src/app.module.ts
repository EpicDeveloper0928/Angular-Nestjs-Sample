import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsModule } from './ads/ads.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from '../config/keys';

@Module({
  imports: [
    AdsModule,
    MongooseModule.forRoot(config.mongoURI),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
