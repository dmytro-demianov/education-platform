import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {UserService} from "./user.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export default class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.userService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}