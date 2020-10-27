import {IsString, IsNotEmpty, IsMongoId} from "class-validator";

export class AddVideoDto {
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	readonly videoHash: string;
}