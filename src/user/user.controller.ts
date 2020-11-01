import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {UserService} from "./user.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Public} from "../common/decorators/public.decorator";
import {
	ApiBasicAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags
} from "@nestjs/swagger";
import {ApiInternalServerErrorResponse} from "../common/decorators/api.internal-server-error-response.decorator";
import {ApiBadRequestResponse} from "../common/decorators/api.bad-request.invalid-payload.decorator";

@ApiTags('Users')
@Controller('users')
export default class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({
		description: "Эндпоинт используется для получения всех пользователей"
	})
	@ApiBasicAuth()
	@ApiOkResponse({
		content: {
			'application/json': {
				example: {
					"data": [
						{
							"hash": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							"name": "John Doe",
							"email": "jdoe@email.com",
							"phone": "+380662332377",
							"password": "123456",
							"sex": "m",
							"role": "newbie"
						}
					]
				},
				schema: {
					required: [
						'data',
					],
					properties: {
						data: {
							type: 'array',
							items: {
								properties: {
									hash: {
										type: 'string($uuid)',
										example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									},
									name: {
										type: 'string',
										example: "John Doe",
									},
									email: {
										type: 'string',
										example: "jdoe@email.com",
									},
									phone: {
										type: 'string',
										example: "+380662332377",
									},
									password: {
										type: 'string',
										example: "123456",
									},
									sex: {
										type: 'string',
										example: "m",
										enum: ['m', 'f']
									},
									role: {
										type: 'string',
										example: "newbie",
										enum: ['newbie', 'student', 'teacher']
									},
								}
							},
						}
					}
				}
			}
		}
	})
	@ApiInternalServerErrorResponse()
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.userService.findAll(paginationQuery);
	}

	@ApiOperation({
		description: 'Эндпоинт используется для получения конкретного пользователя по его hash'
	})
	@ApiBasicAuth()
	@ApiInternalServerErrorResponse()
	@ApiQuery({
		name: 'userHash',
		type: 'string',
		required: true,
		description: 'Хеш пользователя',
	})
	@Get(':userHash')
	findOne(@Param('userHash') userHash: string) {
		return this.userService.findOne(userHash);
	}

	@ApiOperation({
		description: "Эндпоинт используется для создания пользователя. Необязательное условие состоит в том чтобы добавить проверку на уникальность email."
	})
	@ApiBody({
		schema: {
			required: [
				'hash',
				'name',
				'email',
				'phone',
				'password',
				'sex',
			],
			title: 'User',
			properties: {
				hash: {
					type: 'string($uuid)',
					example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
				},
				name: {
					type: 'string',
					example: "John Doe",
				},
				email: {
					type: 'string',
					example: "jdoe@email.com",
				},
				phone: {
					type: 'string',
					example: "+380662332377",
				},
				password: {
					type: 'string',
					example: "123456",
				},
				sex: {
					type: 'string',
					example: "m",
					enum: ['m', 'f']
				},
				role: {
					type: 'string',
					example: "newbie",
					enum: ['newbie', 'student', 'teacher']
				},
			},
		}
	})
	@ApiCreatedResponse()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@Public()
	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<object> {
		const user = await this.userService.create(createUserDto);
		return { hash: user._id };
	}

	@ApiBasicAuth()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiOkResponse({
		schema: {
			required: [
				'data',
			],
			properties: {
				data: {
					type: 'object',
					required: [
						'hash',
						'name',
						'email',
						'phone',
						'password',
						'sex',
					],
					properties: {
						hash: {
							type: 'string($uuid)',
							example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						},
						name: {
							type: 'string',
							example: "John Doe",
						},
						email: {
							type: 'string',
							example: "jdoe@email.com",
						},
						phone: {
							type: 'string',
							example: "+380662332377",
						},
						password: {
							type: 'string',
							example: "123456",
						},
						sex: {
							type: 'string',
							example: "m",
							enum: ['m', 'f']
						},
						role: {
							type: 'string',
							example: "newbie",
							enum: ['newbie', 'student', 'teacher']
						},
					},
				},
			},
		}
	})
	@Put(':userHash')
	update(@Param('userHash') userHash: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(userHash, updateUserDto);
	}

	@ApiBasicAuth()
	@ApiNoContentResponse({
		description: 'Успех: Отсутствует тело ответа',
	})
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@Delete(':userHash')
	delete(@Param('userHash') userHash: string): void {
		this.userService.remove(userHash);
	}
}