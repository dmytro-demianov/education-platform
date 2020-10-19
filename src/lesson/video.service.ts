import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from 'mongoose';
import {CreateVideoDto} from "./dto/create-video.dto";
import {UpdateVideoDto} from "./dto/update-video.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Video} from "./entities/video.entity";

@Injectable()
export class VideoService {
	constructor(
		@InjectModel(Video.name) private readonly userModel: Model<Video>,
		@InjectConnection() private readonly connection: Connection,
	) {}

	create(createVideoDto: CreateVideoDto) {
		const user = new this.userModel(createVideoDto);
		return user.save();
	}

	async update(id: string, updateVideoDto: UpdateVideoDto) {
		const user = await this.userModel
			.findOneAndUpdate({ _id: id }, { $set: updateVideoDto }, { new: true })
			.exec();

		if (!user) {
			throw new NotFoundException(`Video #${id} not found`);
		}

		return user;
	}

	async findOne(id: string) {
		const user = await this.userModel.findOne({ _id: id }).exec();
		if (!user) {
			throw new NotFoundException(`Video #[${id}] not found`);
		}
		return user;
	}

	async remove(id: string) {
		const user = await this.findOne(id);
		return user.remove();
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