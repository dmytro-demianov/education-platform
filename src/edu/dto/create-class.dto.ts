import {
	IsString,
	IsNotEmpty,
	IsNumber,
	Min,
	Max,
	IsObject,
	IsNotEmptyObject,
	IsDefined,
	ValidateNested
} from "class-validator";
import {CreateClassDurationDto} from "./create-class-duration.dto";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateClassDto {
	@ApiProperty({ example: 'Backend' })
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@ApiProperty({ example: 'Backend Online Class' })
	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@ApiProperty({ example: 2, type: 'integer', minimum: 1, maximum: 9999 })
	@IsNumber()
	@Min(1)
	@Max(9999)
	readonly order: number;

	@ApiProperty({
		type: () => CreateClassDurationDto,
	})
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => CreateClassDurationDto)
	readonly duration!: CreateClassDurationDto;
}