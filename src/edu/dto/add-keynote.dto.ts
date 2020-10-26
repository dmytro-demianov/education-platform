import {IsString, IsNotEmpty} from "class-validator";

export class AddKeynoteDto {
	@IsString()
	@IsNotEmpty()
	readonly keynoteHash: string;
}