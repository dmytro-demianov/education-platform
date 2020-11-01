import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {ClassService} from "./class.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateClassDto} from "./dto/create-class.dto";
import {UpdateClassDto} from "./dto/update-class.dto";
import {AddLessonDto} from "./dto/add-lesson.dto";
import {EnrollStudentDto} from "./dto/enroll-student.dto";
import {ExpelStudentDto} from "./dto/expel-student.dto";
import {ApiBasicAuth, ApiNoContentResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ApiCreatedResponse} from "../common/decorators/api.created-hash.decorator";
import {ApiBadRequestResponse} from "../common/decorators/api.bad-request.invalid-payload.decorator";
import {ApiInternalServerErrorResponse} from "../common/decorators/api.internal-server-error-response.decorator";

@ApiTags('Classes')
@Controller('classes')
export default class ClassController {
	constructor(private readonly classService: ClassService) {}

	@ApiBasicAuth()
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.classService.findAll(paginationQuery);
	}

	@ApiBasicAuth()
	@Get(':classHash')
	findOne(@Param('classHash') classHash: string) {
		return this.classService.findOne(classHash);
	}

	@ApiOperation({
		description: "Эндпоинт используется для создания потока"
	})
	@ApiCreatedResponse()
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiBasicAuth()
	@Post()
	create(@Body() createClassDto: CreateClassDto) {
		return this.classService.create(createClassDto);
	}

	@ApiOperation({
		description: "Эндпоинт используется для обновления потока по его hash"
	})
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiBasicAuth()
	@Put(':classHash')
	update(@Param('classHash') classHash: string, @Body() updateClassDto: UpdateClassDto) {
		return this.classService.update(classHash, updateClassDto);
	}

	@ApiOperation({
		description: "Эндпоинт используется для удаления потока по его hash"
	})
	@ApiNoContentResponse({
		description: 'Успех: Отсутствует тело ответа',
	})
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	@ApiBasicAuth()
	@Delete(':classHash')
	delete(@Param('classHash') classHash: string): void {
		this.classService.remove(classHash);
	}

	@ApiBasicAuth()
	@Post(':classHash/lessons')
	addLesson(
		@Param('classHash') classHash: string,
		@Body() addLessonDto: AddLessonDto
	) {
		return this.classService.addLesson(classHash, addLessonDto);
	}

	@ApiBasicAuth()
	@Delete(':classHash/lessons/:lessonHash')
	removeLesson(
		@Param('classHash') classHash: string,
		@Param('lessonHash') lessonHash: string,
	) {
		return this.classService.removeLesson(classHash, lessonHash);
	}

	@ApiBasicAuth()
	@Post(':classHash/enroll')
	enrollStudent(
		@Param('classHash') classHash: string,
		@Body() enrollStudent: EnrollStudentDto,
	) {
		return this.classService.enrollStudent(classHash, enrollStudent);
	}

	@ApiBasicAuth()
	@Post(':classHash/expel')
	expelStudent(
		@Param('classHash') classHash: string,
		@Body() expelStudent: ExpelStudentDto,
	) {
		return this.classService.expelStudent(classHash, expelStudent);
	}
}