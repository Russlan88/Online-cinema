import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from 'src/user/user.controller';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Module({
	controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
	],
	providers: [UserService],
	exports: [UserService],
})
export class AuthModule {}
