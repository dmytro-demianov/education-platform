import {IsNotEmpty, IsDateString} from "class-validator";

export class CreateClassDurationDto {
	@IsDateString()
	@IsNotEmpty()
	readonly started: string;

	@IsDateString()
	@IsNotEmpty()
	readonly closed: string;
}