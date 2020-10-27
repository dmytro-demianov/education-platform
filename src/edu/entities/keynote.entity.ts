import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class Keynote extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true, min: 1, max: 999 })
	order: number;

	@Prop({ required: true })
	uri: string;
}

export const KeynoteSchema = SchemaFactory.createForClass(Keynote).set('toJSON', {
	transform: (doc, entity) => {
		entity.hash = entity._id;
		delete entity._id;
		delete entity.__v;
	}
});