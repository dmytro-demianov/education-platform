import {Controller, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from 'express';
import {AuthService} from "./auth.service";
import {Public} from "../common/decorators/public.decorator";
import {
	ApiBasicAuth,
	ApiHeader,
	ApiNoContentResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller()
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@ApiOperation({
		description: "Эндпоинт используется для логина пользователя. После успешного логина необходимо в куки клиента записать идентификатор токена, который будет автоматически подкладываться во все последующие запросы."
	})
	@ApiHeader({
		name: 'Authorization',
		required: true,
		description: 'base64 string concatenated email + : + password',
		schema: {
			type: 'string',
			default: 'Basic bWF4QGdtYWlsLmNvbTpldTQ4MjM3bXE3WXNwODM=',
				//http://www.utilities-online.info/base64/#.X553Ga5S_65
				//max@gmail.com:eu48237mq7Ysp83
		},
	})
	@ApiNoContentResponse({
		description: 'Успешно установлена куки которая ответчает за авторизацию пользователя',
		headers: {
			'Set-Cookie': {
				schema: {
					type: 'string',
					example: 'USERSESSIONID=abcde12345; Path=/;'
				}
			}
		}
	})
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

	@ApiNoContentResponse({
		description: 'Успех: Отсутствует тело ответа',
	})
	@ApiOperation({ description: 'Эндпоинт используется для разлогина пользователя. В случае успешной операции необходимо удалить идентификатор токена из кук клиента, а также очистить токен из хранилища.' })
	@ApiBasicAuth()
	@Post('logout')
	logout(@Res() response: Response) {
		return response
			.clearCookie('user')
			.status(204)
			.send();
	}
}