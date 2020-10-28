import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "./user/user.module";
import {EduModule} from "./edu/edu.module";
import {CommonModule} from "./common/common.module";

@Module({
  imports: [
    UserModule,
    EduModule,
    CommonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
