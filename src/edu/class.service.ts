import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from 'mongoose';
import {Class} from "./entities/class.entity";
import {CreateClassDto} from "./dto/create-class.dto";
import {UpdateClassDto} from "./dto/update-class.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class ClassService {
	constructor(
		@InjectModel(Class.name) private readonly classModel: Model<Class>,
		@InjectConnection() private readonly connection: Connection,
	) {}

	create(createClassDto: CreateClassDto) {
		const classOne = new this.classModel(createClassDto);
		return classOne.save();
	}

	async update(id: string, updateClassDto: UpdateClassDto) {
		const classOne = await this.classModel
			.findOneAndUpdate({ _id: id }, { $set: updateClassDto }, { new: true })
			.exec();

		if (!classOne) {
			throw new NotFoundException(`Class #${id} not found`);
		}

		return classOne;
	}

	async findOne(id: string) {
		const classOne = await this.classModel.findOne({ _id: id }).exec();
		if (!classOne) {
			throw new NotFoundException(`Class #[${id}] not found`);
		}
		return classOne;
	}

	async remove(id: string) {
		const classOne = await this.findOne(id);
		return classOne.remove();
	}

	findAll(paginationQuery: PaginationQueryDto) {
		let { limit, page } = paginationQuery;
		let offset = (--page) * limit;

		return this.classModel
			.find()
			.skip(offset)
			.limit(limit)
			.exec();
	}
}