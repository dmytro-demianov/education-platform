import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from 'mongoose';
import {Lesson} from "./entities/lesson.entity";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {VideoService} from "./video.service";
import {AddVideoDto} from "./dto/add-video.dto";
import {AddKeynoteDto} from "./dto/add-keynote.dto";
import {KeynoteService} from "./keynote.service";

@Injectable()
export class LessonService {
	constructor(
		@InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
		@InjectConnection() private readonly connection: Connection,
		private readonly videoService: VideoService,
		private readonly keynoteService: KeynoteService,
	) {}

	create(createLessonDto: CreateLessonDto) {
		const lesson = new this.lessonModel(createLessonDto);
		return lesson.save();
	}

	async update(lessonHash: string, updateLessonDto: UpdateLessonDto) {
		const lesson = await this.lessonModel
			.findOneAndUpdate({ _id: lessonHash }, { $set: updateLessonDto }, { new: true })
			.exec();

		if (!lesson) {
			throw new NotFoundException(`Lesson #[${lessonHash}] not found`);
		}

		return lesson;
	}

	async findOne(lessonHash: string) {
		const lesson = await this.lessonModel.findOne({ _id: lessonHash }).exec();
		if (!lesson) {
			throw new NotFoundException(`Lesson #[${lessonHash}] not found`);
		}
		return lesson;
	}

	async remove(lessonHash: string) {
		const lesson = await this.findOne(lessonHash);
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

	async addVideo(lessonHash: string, addVideoDto: AddVideoDto) {
		const session = await this.connection.startSession();
		session.startTransaction();

		let updatedLesson = null;

		try {
			const lesson = await this.findOne(lessonHash);
			await this.videoService.findOne(addVideoDto.videoHash);

			lesson.content.videos.push(addVideoDto.videoHash);

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

	async removeVideo(lessonHash: string, videoHash: string) {
		const lesson = await this.findOne(lessonHash);

		const videoIndex = lesson.content.videos.indexOf(videoHash);
		lesson.content.videos.splice(videoIndex, 1);

		return lesson.save();
	}

	async addKeynote(lessonHash: string, addKeynoteDto: AddKeynoteDto) {
		const session = await this.connection.startSession();
		session.startTransaction();

		let updatedLesson = null;

		try {
			const lesson = await this.findOne(lessonHash);
			await this.keynoteService.findOne(addKeynoteDto.keynoteHash);

			lesson.content.keynotes.push(addKeynoteDto.keynoteHash);

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

	async removeKeynote(lessonHash: string, keynoteId: string) {
		const lesson = await this.findOne(lessonHash);

		const keynoteIndex = lesson.content.keynotes.indexOf(keynoteId);
		lesson.content.keynotes.splice(keynoteIndex, 1);

		return lesson.save();
	}
}