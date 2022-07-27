import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/Auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { UserModel } from './user.model';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	public async getProfile(@User('_id') _id: string) {
		return this.userService.byId(_id);
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	public async updateProfile(
		@User('_id') _id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.updateProfile(_id, dto);
	}

	@Get('profile/favorites')
	@Auth()
	public async getFavorites(@User('_id') _id: Types.ObjectId) {
		return this.userService.getFavoriteMovie(_id);
	}

	@Put('profile/favorites')
	@HttpCode(200)
	@Auth()
	public async toggleFavorite(
		@Body('movieId', IdValidationPipe)
		movieId: Types.ObjectId,
		@User() user: UserModel
	) {
		return this.userService.toggleFavorites(movieId, user);
	}

	@Get('count')
	@Auth('admin')
	public async getCountUsers() {
		return this.userService.getCount();
	}
	@Get()
	@Auth('admin')
	public async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm);
	}
	@Get(':id')
	@Auth('admin')
	public async getUser(@Param('id', IdValidationPipe) id: string) {
		return this.userService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	public async updateUser(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.updateProfile(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	public async deleteUser(@Param('id', IdValidationPipe) id: string) {
		return this.userService.delete(id);
	}
}
