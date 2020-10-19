import {IsString, IsNotEmpty, IsNumber, Min, Max, IsUrl} from "class-validator";

export class CreateVideoDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsNumber()
	@Min(1)
	@Max(999)
	readonly order: number;

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	readonly uri: string;
}