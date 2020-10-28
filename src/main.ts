import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {WrapResponseInterceptor} from "./common/interceptors/wrap-response.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            }
        })
    );

    let cookieParser = require('cookie-parser');
    app.use(cookieParser());

    app.useGlobalInterceptors(
        new WrapResponseInterceptor(),
    );

    await app.listen(3000);
}
bootstrap();
