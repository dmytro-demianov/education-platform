import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {LessonService} from "./lesson.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {CreateVideoDto} from "./dto/create-video.dto";

@Controller('lesson')
export default class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.lessonService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.lessonService.findOne(id);
	}

	@Post()
	create(@Body() createLessonDto: CreateLessonDto) {
		return this.lessonService.create(createLessonDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
		return this.lessonService.update(id, updateLessonDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.lessonService.remove(id);
	}

	@Post(':id/videos')
	async addVideo(
		@Param('id') id: string,
		@Body() createVideoDto: CreateVideoDto
	) {
		return this.lessonService.addVideo(id, createVideoDto);
	}

	@Delete(':id/videos/:videoId')
	async removeVideo(
		@Param('id') id: string,
		@Param('videoId') videoId: string
	) {
		return this.lessonService.removeVideo(id, videoId);
	}
}