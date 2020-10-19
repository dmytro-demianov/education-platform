import {IsString, IsEmail, IsMobilePhone, IsIn, IsNotEmpty} from "class-validator";

export class CreateUserDto {

	@IsString()
	@IsNotEmpty()
	readonly name: string;

	@IsString()
	@IsEmail()
	readonly email: string;

	@IsString()
	@IsMobilePhone()
	readonly phone: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;

	@IsString()
	@IsIn(['male', 'female'])
	readonly sex: string;

	@IsString()
	@IsIn(['newbie', 'student', 'teacher'])
	readonly role: string;
}