import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';

import { TypegooseModule } from 'nestjs-typegoose';
import { GenreModule } from './genre/genre.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		UserModule,
		AuthModule,
		GenreModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
