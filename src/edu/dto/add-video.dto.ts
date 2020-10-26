import {IsString, IsNotEmpty} from "class-validator";

export class AddVideoDto {
	@IsString()
	@IsNotEmpty()
	readonly videoHash: string;
}