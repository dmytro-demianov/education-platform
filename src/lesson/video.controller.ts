import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {VideoService} from "./video.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateVideoDto} from "./dto/create-video.dto";
import {UpdateVideoDto} from "./dto/update-video.dto";

@Controller('video')
export default class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.videoService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.videoService.findOne(id);
	}

	@Post()
	create(@Body() createVideoDto: CreateVideoDto) {
		return this.videoService.create(createVideoDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
		return this.videoService.update(id, updateVideoDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.videoService.remove(id);
	}
}