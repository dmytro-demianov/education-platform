import {
	IsString,
	IsNotEmpty,
	IsNumber,
	Min,
	Max,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateLessonDto {
	@ApiProperty({ example: 'Lesson 1: Introduction' })
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@ApiProperty({ example: 'Description for lesson 1' })
	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@ApiProperty({ example: 2, type: 'integer', minimum: 1, maximum: 9999 })
	@IsNumber()
	@Min(1)
	@Max(9999)
	readonly order: number;
}