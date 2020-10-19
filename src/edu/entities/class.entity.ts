import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class Class extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true, min: 1, max: 9999 })
	order: number;

	@Prop(
		raw({
			started: { type: Date },
			closed: { type: Date }
		})
	)
	duration: Record<string, any>;
}

export const ClassSchema = SchemaFactory.createForClass(Class);