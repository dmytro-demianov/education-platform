import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Video} from "./video.entity";
import {Keynote} from "./keynote.entity";

@Schema()
export class LessonContent extends Document {
	@Prop({ required: true })
	videos: Video[];

	@Prop({ required: true })
	keynotes: Keynote[];
}

export const LessonContentSchema = SchemaFactory.createForClass(LessonContent);