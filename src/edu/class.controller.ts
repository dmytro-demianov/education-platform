import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {ClassService} from "./class.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateClassDto} from "./dto/create-class.dto";
import {UpdateClassDto} from "./dto/update-class.dto";

@Controller('class')
export default class ClassController {
	constructor(private readonly classService: ClassService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.classService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.classService.findOne(id);
	}

	@Post()
	create(@Body() createClassDto: CreateClassDto) {
		return this.classService.create(createClassDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
		return this.classService.update(id, updateClassDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.classService.remove(id);
	}
}