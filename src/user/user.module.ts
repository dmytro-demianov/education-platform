import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import UserController from "./user.controller";
import {UserService} from "./user.service";
import AuthController from "./auth.controller";
import {AuthService} from "./auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [
        UserController,
        AuthController,
    ],
    providers: [
        UserService,
        AuthService,
    ],
    exports: [UserService],
})
export class UserModule {}
