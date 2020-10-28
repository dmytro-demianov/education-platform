import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {VideoService} from "./video.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateVideoDto} from "./dto/create-video.dto";
import {UpdateVideoDto} from "./dto/update-video.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Video')
@Controller('video')
export default class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.videoService.findAll(paginationQuery);
	}

	@Get(':videoHash')
	findOne(@Param('videoHash') videoHash: string) {
		return this.videoService.findOne(videoHash);
	}

	@Post()
	create(@Body() createVideoDto: CreateVideoDto) {
		return this.videoService.create(createVideoDto);
	}

	@Put(':videoHash')
	update(@Param('videoHash') videoHash: string, @Body() updateVideoDto: UpdateVideoDto) {
		return this.videoService.update(videoHash, updateVideoDto);
	}

	@Delete(':videoHash')
	delete(@Param('videoHash') videoHash: string) {
		return this.videoService.remove(videoHash);
	}
}