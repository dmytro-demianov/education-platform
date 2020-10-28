import {Module} from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./guards/auth.guard";
import {UserModule} from "../user/user.module";

@Module({
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		}
	],
	imports: [
		UserModule,
	]
})

export class CommonModule {}