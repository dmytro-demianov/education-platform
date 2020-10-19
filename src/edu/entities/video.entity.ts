import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class Video extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true, min: 1, max: 999 })
	order: number;

	@Prop({ required: true })
	uri: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);