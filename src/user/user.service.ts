import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from 'mongoose';
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		@InjectConnection() private readonly connection: Connection,
	) {}

	create(createUserDto: CreateUserDto) {
		const user = new this.userModel(createUserDto);
		return user.save();
	}

	async update(userHash: string, updateUserDto: UpdateUserDto) {
		const user = await this.userModel
			.findOneAndUpdate({ _id: userHash }, { $set: updateUserDto }, { new: true })
			.exec();

		if (!user) {
			throw new NotFoundException(`User #${userHash} not found`);
		}

		return user;
	}

	async findOne(userHash: string) {
		const user = await this.userModel.findOne({ _id: userHash }).exec();
		if (!user) {
			throw new NotFoundException(`User #[${userHash}] not found`);
		}
		return user;
	}

	async remove(userHash: string) {
		const user = await this.findOne(userHash);
		return user.remove();
	}

	async checkExistsByToken(token: string): Promise<boolean> {
		return !!await this.userModel.findOne({ token }).exec();
	}

	findAll(paginationQuery: PaginationQueryDto) {
		let { limit, page } = paginationQuery;
		let offset = (--page) * limit;

		return this.userModel
			.find()
			.skip(offset)
			.limit(limit)
			.exec();
	}
}