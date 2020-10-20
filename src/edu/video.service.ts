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
		@InjectModel(Video.name) private readonly videoModel: Model<Video>,
		@InjectConnection() private readonly connection: Connection,
	) {}

	create(createVideoDto: CreateVideoDto) {
		const video = new this.videoModel(createVideoDto);
		return video.save();
	}

	async update(id: string, updateVideoDto: UpdateVideoDto) {
		const video = await this.videoModel
			.findOneAndUpdate({ _id: id }, { $set: updateVideoDto }, { new: true })
			.exec();

		if (!video) {
			throw new NotFoundException(`Video #${id} not found`);
		}

		return video;
	}

	async findOne(id: string) {
		const video = await this.videoModel.findOne({ _id: id }).exec();
		if (!video) {
			throw new NotFoundException(`Video #[${id}] not found`);
		}
		return video;
	}

	async remove(id: string) {
		const video = await this.findOne(id);
		return video.remove();
	}

	findAll(paginationQuery: PaginationQueryDto) {
		let { limit, page } = paginationQuery;
		let offset = (--page) * limit;

		return this.videoModel
			.find()
			.skip(offset)
			.limit(limit)
			.exec();
	}
}