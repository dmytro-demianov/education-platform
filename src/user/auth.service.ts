import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./entities/user.entity";
import {Model} from "mongoose";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";

@Injectable()
export class AuthService {
	private readonly basicStringStart = 'Basic ';
	private readonly basicCredentialsDelimiter = ':';
	private readonly credentialsEncoding = 'base64';

	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async generateAndSaveToken(basicAuthCredentials: string): Promise<string | null> {
		const credentials = this.decodeAndGetCredentials(basicAuthCredentials);
		if (!credentials) {
			return null;
		}

		const user = await this.userModel.findOne(credentials);
		if (!user) {
			return null;
		}

		const token = randomStringGenerator();

		user.token = token;
		user.save();

		return token;
	}

	private decodeAndGetCredentials(basicAuthCredentials: string): object | null {
		if (!basicAuthCredentials.startsWith(this.basicStringStart)) {
			return null;
		}

		let base64Credentials = basicAuthCredentials.replace(this.basicStringStart, '');
		if (base64Credentials.length === 0) {
			return null;
		}

		let credentials = new Buffer(base64Credentials, this.credentialsEncoding)
			.toString()
			.split(this.basicCredentialsDelimiter);

		if (credentials.length !== 2) {
			return null;
		}

		const [email, password] = credentials;
		return { email, password };
	}
}