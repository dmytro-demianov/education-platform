import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {KeynoteService} from "./keynote.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateKeynoteDto} from "./dto/create-keynote.dto";
import {UpdateKeynoteDto} from "./dto/update-keynote.dto";
import {ApiBasicAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ApiBadRequestResponse} from "../common/decorators/api.bad-request.invalid-payload.decorator";
import {ApiInternalServerErrorResponse} from "../common/decorators/api.internal-server-error-response.decorator";
import {Keynote} from "./entities/keynote.entity";
import {ApiCreatedResponse} from "../common/decorators/api.created-hash.decorator";

@ApiTags('Keynotes')
@Controller('keynotes')
export default class KeynoteController {
	constructor(private readonly keynoteService: KeynoteService) {}

	@ApiOperation({
		description: "Эндпоинт используется для получения всех презентаций"
	})
	@ApiBasicAuth()
	@Get()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiOkResponse({
		content: {
			'application/json': {
				example: {
					"data": [
						{
							"hash": "keynoteHash",
							"title": "Node.js architecture",
							"order": 1,
							"uri": "https://lectrum.io/keynotes/lesson-1"
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
								required: [
									'title',
									'order',
									'uri',
								],
								properties: {
									hash: {
										type: 'string',
										example: 'keynoteHash',
									},
									title: {
										type: 'string',
										example: 'Node.js architecture',
									},
									order: {
										type: 'integer',
										minimum: 1,
										example: 1,
									},
									uri: {
										type: 'string',
										example: 'https://lectrum.io/keynotes/lesson-1',
									},
								}
							}
						}
					}
				}
			}
		}
	})
	findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Keynote[]> {
		return this.keynoteService.findAll(paginationQuery);
	}

	@ApiOperation({
		description: "Эндпоинт используется для получения конкретной презентации с помощью hash"
	})
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiOkResponse({
		content: {
			'application/json': {
				example: {
					"data": [
						{
							"hash": "keynoteHash",
							"title": "Node.js architecture",
							"order": 1,
							"uri": "https://lectrum.io/keynotes/lesson-1"
						}
					]
				},
				schema: {
					required: [
						'data',
					],
					properties: {
						data: {
							type: 'object',
							required: [
								'title',
								'order',
								'uri',
							],
							properties: {
								hash: {
									type: 'string',
									example: 'keynoteHash',
								},
								title: {
									type: 'string',
									example: 'Node.js architecture',
								},
								order: {
									type: 'integer',
									minimum: 1,
									example: 1,
								},
								uri: {
									type: 'string',
									example: 'https://lectrum.io/keynotes/lesson-1',
								},
							}
						}
					}
				}
			}
		}
	})
	@ApiBasicAuth()
	@Get(':keynoteHash')
	findOne(@Param('keynoteHash') keynoteHash: string) {
		return this.keynoteService.findOne(keynoteHash);
	}

	@ApiOperation({
		description: "Эндпоинт используется для создания презентаций."
	})
	@ApiCreatedResponse()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiBasicAuth()
	@Post()
	async create(@Body() createKeynoteDto: CreateKeynoteDto): Promise<object> {
		const keynote = await this.keynoteService.create(createKeynoteDto);
		return { hash: keynote._id };
	}

	@ApiOperation({
		description: "Эндпоинт используется для обновления презентации с помощью hash"
	})
	@ApiBasicAuth()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@Put(':keynoteHash')
	update(@Param('keynoteHash') keynoteHash: string, @Body() updateKeynoteDto: UpdateKeynoteDto) {
		return this.keynoteService.update(keynoteHash, updateKeynoteDto);
	}

	@ApiOperation({
		description: "Эндпоинт используется для удаления презентации с помощью hash"
	})
	@ApiNoContentResponse({
		description: 'Успех: Отсутствует тело ответа',
	})
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiBasicAuth()
	@Delete(':keynoteHash')
	delete(@Param('keynoteHash') keynoteHash: string): void {
		this.keynoteService.remove(keynoteHash);
	}
}