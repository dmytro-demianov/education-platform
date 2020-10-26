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
}