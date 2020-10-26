import {IsString, IsNotEmpty} from "class-validator";

export class AddLessonDto {
	@IsString()
	@IsNotEmpty()
	readonly lessonHash: string;
}