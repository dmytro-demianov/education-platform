import {IsString, IsNotEmpty, IsNumber, Min, Max, IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateVideoDto {
	@ApiProperty({ example: 'Node.js introduction' })
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@ApiProperty({ example: 1, type: 'integer', minimum: 1, maximum: 999 })
	@IsNumber()
	@Min(1)
	@Max(999)
	readonly order: number;

	@ApiProperty({ example: 'https://lectrum.io/videos/lesson-1' })
	@IsString()
	@IsNotEmpty()
	@IsUrl()
	readonly uri: string;
}