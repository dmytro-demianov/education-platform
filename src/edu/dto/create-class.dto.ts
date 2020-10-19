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

export class CreateClassDto {
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

	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => CreateClassDurationDto)
	readonly duration!: CreateClassDurationDto;
}