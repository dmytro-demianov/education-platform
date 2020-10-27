import {IsString, IsNotEmpty, IsMongoId} from "class-validator";

export class EnrollStudentDto {
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	readonly userHash: string;
}