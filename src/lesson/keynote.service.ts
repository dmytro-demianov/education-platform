import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from 'mongoose';
import {Keynote} from "./entities/keynote.entity";
import {CreateKeynoteDto} from "./dto/create-keynote.dto";
import {UpdateKeynoteDto} from "./dto/update-keynote.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class KeynoteService {
	constructor(
		@InjectModel(Keynote.name) private readonly keynoteModel: Model<Keynote>,
		@InjectConnection() private readonly connection: Connection,
	) {}

	create(createKeynoteDto: CreateKeynoteDto) {
		const keynote = new this.keynoteModel(createKeynoteDto);
		return keynote.save();
	}

	async update(id: string, updateKeynoteDto: UpdateKeynoteDto) {
		const keynote = await this.keynoteModel
			.findOneAndUpdate({ _id: id }, { $set: updateKeynoteDto }, { new: true })
			.exec();

		if (!keynote) {
			throw new NotFoundException(`Keynote #${id} not found`);
		}

		return keynote;
	}

	async findOne(id: string) {
		const keynote = await this.keynoteModel.findOne({ _id: id }).exec();
		if (!keynote) {
			throw new NotFoundException(`Keynote #[${id}] not found`);
		}
		return keynote;
	}

	async remove(id: string) {
		const keynote = await this.findOne(id);
		return keynote.remove();
	}

	findAll(paginationQuery: PaginationQueryDto) {
		let { limit, page } = paginationQuery;
		let offset = (--page) * limit;

		return this.keynoteModel
			.find()
			.skip(offset)
			.limit(limit)
			.exec();
	}
}