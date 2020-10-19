import {IsPositive} from "class-validator";

export class PaginationQueryDto {
	@IsPositive()
	limit: number = 15;

	@IsPositive()
	page: number = 1;
}
