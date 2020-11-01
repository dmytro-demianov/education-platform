import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {VideoService} from "./video.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateVideoDto} from "./dto/create-video.dto";
import {UpdateVideoDto} from "./dto/update-video.dto";
import {ApiBasicAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ApiBadRequestResponse} from "../common/decorators/api.bad-request.invalid-payload.decorator";
import {ApiInternalServerErrorResponse} from "../common/decorators/api.internal-server-error-response.decorator";
import {ApiCreatedResponse} from "../common/decorators/api.created-hash.decorator";

@ApiTags('Videos')
@Controller('videos')
export default class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@ApiOperation({
		description: "Эндпоинт используется для получения всех видео"
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
							"hash": "videoHash",
							"title": "Node.js architecture",
							"order": 1,
							"uri": "https://lectrum.io/videos/lesson-1"
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
										example: 'videoHash',
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
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.videoService.findAll(paginationQuery);
	}

	@ApiBasicAuth()
	@Get(':videoHash')
	findOne(@Param('videoHash') videoHash: string) {
		return this.videoService.findOne(videoHash);
	}

	@ApiBasicAuth()
	@Post()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiCreatedResponse()
	async create(@Body() createVideoDto: CreateVideoDto): Promise<object> {
		const video = await this.videoService.create(createVideoDto);
		return { hash: video._id };
	}

	@ApiBasicAuth()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@Put(':videoHash')
	update(@Param('videoHash') videoHash: string, @Body() updateVideoDto: UpdateVideoDto) {
		return this.videoService.update(videoHash, updateVideoDto);
	}

	@ApiBasicAuth()
	@ApiNoContentResponse({
		description: 'Успех: Отсутствует тело ответа',
	})
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@Delete(':videoHash')
	delete(@Param('videoHash') videoHash: string): void {
		this.videoService.remove(videoHash);
	}
}