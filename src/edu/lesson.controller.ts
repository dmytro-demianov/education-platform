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

	@Get(':lessonHash')
	findOne(@Param('lessonHash') lessonHash: string) {
		return this.lessonService.findOne(lessonHash);
	}

	@Post()
	create(@Body() createLessonDto: CreateLessonDto) {
		return this.lessonService.create(createLessonDto);
	}

	@Put(':lessonHash')
	update(@Param('lessonHash') lessonHash: string, @Body() updateLessonDto: UpdateLessonDto) {
		return this.lessonService.update(lessonHash, updateLessonDto);
	}

	@Delete(':lessonHash')
	delete(@Param('lessonHash') lessonHash: string) {
		return this.lessonService.remove(lessonHash);
	}

	@Post(':lessonHash/videos')
	addVideo(
		@Param('lessonHash') lessonHash: string,
		@Body() addVideoDto: AddVideoDto
	) {
		return this.lessonService.addVideo(lessonHash, addVideoDto);
	}

	@Delete(':lessonHash/videos/:videoHash')
	removeVideo(
		@Param('lessonHash') lessonHash: string,
		@Param('videoHash') videoHash: string
	) {
		return this.lessonService.removeVideo(lessonHash, videoHash);
	}

	@Get(':lessonHash/videos/:videoHash')
	findOneVideo(
		@Param('lessonHash') lessonHash: string,
		@Param('videoHash') videoHash: string,
	) {
		return this.lessonService.findOneVideo(lessonHash, videoHash);
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

	@Get(':lessonHash/keynotes/:keynoteHash')
	findOneKeynote(
		@Param('lessonHash') lessonHash: string,
		@Param('keynoteHash') keynoteHash: string,
	) {
		return this.lessonService.findOneKeynote(lessonHash, keynoteHash);
	}
}