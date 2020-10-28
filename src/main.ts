import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {WrapResponseInterceptor} from "./common/interceptors/wrap-response.interceptor";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

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

    const options = new DocumentBuilder()
        .setTitle('Education')
        .setDescription('Final project: education platform')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
