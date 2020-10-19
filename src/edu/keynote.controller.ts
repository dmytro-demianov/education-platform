import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {KeynoteService} from "./keynote.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateKeynoteDto} from "./dto/create-keynote.dto";
import {UpdateKeynoteDto} from "./dto/update-keynote.dto";

@Controller('keynote')
export default class KeynoteController {
	constructor(private readonly keynoteService: KeynoteService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.keynoteService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.keynoteService.findOne(id);
	}

	@Post()
	create(@Body() createKeynoteDto: CreateKeynoteDto) {
		return this.keynoteService.create(createKeynoteDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateKeynoteDto: UpdateKeynoteDto) {
		return this.keynoteService.update(id, updateKeynoteDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.keynoteService.remove(id);
	}
}