import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {LessonContent} from "./lesson-content.entity";

@Schema()
export class Lesson extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	order: number;

	@Prop({ required: true, enum: ['standard', 'select', 'premium'] })
	availability: string;

	@Prop()
	content: LessonContent;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);