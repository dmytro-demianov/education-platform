import {IsString, IsNotEmpty, IsMongoId} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddKeynoteDto {
	@ApiProperty({ example: '5f8dde930022710a0cdd37e4' })
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	readonly keynoteHash: string;
}