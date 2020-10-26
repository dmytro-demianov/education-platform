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

	async update(videoHash: string, updateVideoDto: UpdateVideoDto) {
		const video = await this.videoModel
			.findOneAndUpdate({ _id: videoHash }, { $set: updateVideoDto }, { new: true })
			.exec();

		if (!video) {
			throw new NotFoundException(`Video #${videoHash} not found`);
		}

		return video;
	}

	async findOne(videoHash: string) {
		const video = await this.videoModel.findOne({ _id: videoHash }).exec();
		if (!video) {
			throw new NotFoundException(`Video #[${videoHash}] not found`);
		}
		return video;
	}

	async remove(videoHash: string) {
		const video = await this.findOne(videoHash);
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