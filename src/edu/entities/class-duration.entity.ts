import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class ClassDuration extends Document {
	@Prop({ required: true })
	started: Date;

	@Prop({ required: true })
	closed: Date;
}

export const ClassDurationSchema = SchemaFactory.createForClass(ClassDuration);