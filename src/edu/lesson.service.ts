import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from 'mongoose';
import {Lesson} from "./entities/lesson.entity";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateVideoDto} from "./dto/create-video.dto";
import {VideoService} from "./video.service";

@Injectable()
export class LessonService {
	constructor(
		@InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
		@InjectConnection() private readonly connection: Connection,
		private readonly videoService: VideoService,
	) {}

	create(createLessonDto: CreateLessonDto) {
		const lesson = new this.lessonModel(createLessonDto);
		return lesson.save();
	}

	async update(id: string, updateLessonDto: UpdateLessonDto) {
		const lesson = await this.lessonModel
			.findOneAndUpdate({ _id: id }, { $set: updateLessonDto }, { new: true })
			.exec();

		if (!lesson) {
			throw new NotFoundException(`Lesson #[${id}] not found`);
		}

		return lesson;
	}

	async findOne(id: string) {
		const lesson = await this.lessonModel.findOne({ _id: id }).exec();
		if (!lesson) {
			throw new NotFoundException(`Lesson #[${id}] not found`);
		}
		return lesson;
	}

	async remove(id: string) {
		const lesson = await this.findOne(id);
		return lesson.remove();
	}

	findAll(paginationQuery: PaginationQueryDto) {
		let { limit, page } = paginationQuery;
		let offset = (--page) * limit;

		return this.lessonModel
			.find()
			.skip(offset)
			.limit(limit)
			.exec();
	}

	async addVideo(id: string, createVideoDto: CreateVideoDto) {
		const session = await this.connection.startSession();
		session.startTransaction();

		let updatedLesson = null;

		try {
			const lesson = await this.findOne(id);
			const video = await this.videoService.create(createVideoDto);

			lesson.content.videos.push(video._id);

			updatedLesson = lesson.save();

			await session.commitTransaction();
		} catch (e) {
			await session.abortTransaction();

			throw e;
		} finally {
			session.endSession();
		}

		return updatedLesson;
	}

	async removeVideo(id: string, videoId: string) {
		const lesson = await this.findOne(id);

		const videoIndex = lesson.content.videos.indexOf(videoId);
		lesson.content.videos.splice(videoIndex, 1);

		return lesson.save();
	}
}