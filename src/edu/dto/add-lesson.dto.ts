import {IsString, IsNotEmpty, IsMongoId} from "class-validator";

export class AddLessonDto {
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	readonly lessonHash: string;
}