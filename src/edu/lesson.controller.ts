import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {LessonService} from "./lesson.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {AddVideoDto} from "./dto/add-video.dto";
import {AddKeynoteDto} from "./dto/add-keynote.dto";

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
	addVideo(
		@Param('id') id: string,
		@Body() addVideoDto: AddVideoDto
	) {
		return this.lessonService.addVideo(id, addVideoDto);
	}

	@Delete(':id/videos/:videoId')
	removeVideo(
		@Param('id') id: string,
		@Param('videoId') videoId: string
	) {
		return this.lessonService.removeVideo(id, videoId);
	}

	@Post(':lessonHash/keynotes')
	addKeynote(
		@Param('lessonHash') lessonHash: string,
		@Body() addKeynoteDto: AddKeynoteDto
	) {
		return this.lessonService.addKeynote(lessonHash, addKeynoteDto);
	}

	@Delete(':lessonHash/keynotes/:keynoteHash')
	removeKeynote(
		@Param('lessonHash') lessonHash: string,
		@Param('keynoteHash') keynoteHash: string
	) {
		return this.lessonService.removeKeynote(lessonHash, keynoteHash);
	}
}