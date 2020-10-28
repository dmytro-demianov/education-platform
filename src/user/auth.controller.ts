import {Controller, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from 'express';
import {AuthService} from "./auth.service";
import {Public} from "../common/decorators/public.decorator";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller()
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('login')
	async login(
		@Req() request: Request,
		@Res() response: Response,
	) {
		const {authorization = null} = request.headers;

		if (typeof authorization === 'string') {
			const token = await this.authService.generateAndSaveToken(authorization);

			if (token) {
				return response
					.cookie('user', token)
					.status(204)
					.send();
			}
		}

		return response
			.status(400)
			.send();
	}

	@Post('logout')
	logout(@Res() response: Response) {
		return response
			.clearCookie('user')
			.status(204)
			.send();
	}
}