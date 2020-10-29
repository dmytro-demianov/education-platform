import {IsString, IsEmail, IsMobilePhone, IsIn, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

	@ApiProperty({ example: 'John Doe' })
	@IsString()
	@IsNotEmpty()
	readonly name: string;

	@ApiProperty({ example: 'jdoe@email.com' })
	@IsString()
	@IsEmail()
	readonly email: string;

	@ApiProperty({ example: '+380662332377' })
	@IsString()
	@IsMobilePhone()
	readonly phone: string;

	@ApiProperty({ example: '123456' })
	@IsString()
	@IsNotEmpty()
	readonly password: string;

	@ApiProperty({ example: 'm', enum: ['m', 'f'] })
	@IsString()
	@IsIn(['m', 'f'])
	readonly sex: string;

	@ApiProperty({ example: 'newbie', enum: ['newbie', 'student', 'teacher'] })
	@IsString()
	@IsIn(['newbie', 'student', 'teacher'])
	readonly role: string;
}