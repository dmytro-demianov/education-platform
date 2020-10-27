import {IsString, IsNotEmpty, IsMongoId} from "class-validator";

export class AddKeynoteDto {
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	readonly keynoteHash: string;
}