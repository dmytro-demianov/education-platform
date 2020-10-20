import {
	IsString,
	IsNotEmpty,
	IsNumber,
	Min,
	Max,
	IsIn,
} from "class-validator";

export class CreateLessonDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@IsNumber()
	@Min(1)
	@Max(9999)
	readonly order: number;

	@IsNotEmpty()
	@IsIn(['standard', 'select', 'premium'])
	readonly availability: string;
}