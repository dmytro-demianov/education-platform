import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
	hash: string;

	@Prop()
	token?: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	phone: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true, enum: ['m', 'f'] })
	sex: string;

	@Prop({
		required: true,
		enum: ['newbie', 'student', 'teacher']
	})
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(User).set('toJSON', {
	transform: (doc, entity) => {
		entity.hash = entity._id;
		delete entity._id;
		delete entity.__v;
	}
});