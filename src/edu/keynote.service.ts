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

	async update(keynoteHash: string, updateKeynoteDto: UpdateKeynoteDto) {
		const keynote = await this.keynoteModel
			.findOneAndUpdate({ _id: keynoteHash }, { $set: updateKeynoteDto }, { new: true })
			.exec();

		if (!keynote) {
			throw new NotFoundException(`Keynote #${keynoteHash} not found`);
		}

		return keynote;
	}

	async findOne(keynoteHash: string) {
		const keynote = await this.keynoteModel.findOne({ _id: keynoteHash }).exec();
		if (!keynote) {
			throw new NotFoundException(`Keynote #[${keynoteHash}] not found`);
		}
		return keynote;
	}

	async remove(keynoteHash: string) {
		const keynote = await this.findOne(keynoteHash);
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