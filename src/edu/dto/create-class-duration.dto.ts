import {IsNotEmpty, IsDateString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateClassDurationDto {
	@ApiProperty({ type: 'string($date-time)', example: '2019-06-19T07:44:06.353Z' })
	@IsDateString()
	@IsNotEmpty()
	readonly started: string;

	@ApiProperty({ type: 'string($date-time)', example: '2019-06-19T07:44:06.353Z' })
	@IsDateString()
	@IsNotEmpty()
	readonly closed: string;
}