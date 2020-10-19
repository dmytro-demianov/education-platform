import {IsString, IsNotEmpty, IsNumber, Min, Max, IsUrl} from "class-validator";

export class CreateKeynoteDto {
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