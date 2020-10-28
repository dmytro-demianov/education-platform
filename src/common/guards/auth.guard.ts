import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";
import {UserService} from "../../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private readonly reflector: Reflector,
      private readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { user: userToken = null } = request.cookies;

    return userToken && this.userService.checkExistsByToken(userToken);
  }
}