import {IsPositive} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationQueryDto {
	@ApiProperty({
		default: 10,
		description: 'Ограничивате количество элементов в выборке',
		example: 15,
	})
	@IsPositive()
	limit: number = 15;

	@ApiProperty({
		default: 1,
	})
	@IsPositive()
	page: number = 1;
}
