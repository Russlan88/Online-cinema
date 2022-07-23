import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/Auth.decorator';
import { UserModel } from './user.model';
import { Types } from 'mongoose';
import { User } from './decorators/user.decorator';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	public async getProfile(@User('_id') _id: string) {
		return this.userService.byId(_id);
	}
}
