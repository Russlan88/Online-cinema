import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { ActorModule } from './actor/actor.module';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './config/mongo.config';
// import { FilesModule } from './files/files.module';
// import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';

import { TypegooseModule } from 'nestjs-typegoose';
// import { RatingModule } from './rating/rating.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		// ActorModule,
		UserModule,
		AuthModule,
		// FilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
