import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {ClassService} from "./class.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateClassDto} from "./dto/create-class.dto";
import {UpdateClassDto} from "./dto/update-class.dto";
import {AddLessonDto} from "./dto/add-lesson.dto";
import {EnrollStudentDto} from "./dto/enroll-student.dto";
import {ExpelStudentDto} from "./dto/expel-student.dto";

@Controller('classes')
export default class ClassController {
	constructor(private readonly classService: ClassService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.classService.findAll(paginationQuery);
	}

	@Get(':classHash')
	findOne(@Param('classHash') classHash: string) {
		return this.classService.findOne(classHash);
	}

	@Post()
	create(@Body() createClassDto: CreateClassDto) {
		return this.classService.create(createClassDto);
	}

	@Put(':classHash')
	update(@Param('classHash') classHash: string, @Body() updateClassDto: UpdateClassDto) {
		return this.classService.update(classHash, updateClassDto);
	}

	@Delete(':classHash')
	delete(@Param('classHash') classHash: string) {
		return this.classService.remove(classHash);
	}

	@Post(':classHash/lessons')
	addLesson(
		@Param('classHash') classHash: string,
		@Body() addLessonDto: AddLessonDto
	) {
		return this.classService.addLesson(classHash, addLessonDto);
	}

	@Delete(':classHash/lessons/:lessonHash')
	removeLesson(
		@Param('classHash') classHash: string,
		@Param('lessonHash') lessonHash: string,
	) {
		return this.classService.removeLesson(classHash, lessonHash);
	}

	@Post(':classHash/enroll')
	enrollStudent(
		@Param('classHash') classHash: string,
		@Body() enrollStudent: EnrollStudentDto,
	) {
		return this.classService.enrollStudent(classHash, enrollStudent);
	}

	@Post(':classHash/expel')
	expelStudent(
		@Param('classHash') classHash: string,
		@Body() expelStudent: ExpelStudentDto,
	) {
		return this.classService.expelStudent(classHash, expelStudent);
	}
}