import {IsString, IsNotEmpty, IsMongoId} from "class-validator";

export class ExpelStudentDto {
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	readonly userHash: string;
}