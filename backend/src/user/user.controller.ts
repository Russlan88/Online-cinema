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
// import { User } from './decorators/user.decorator';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/Auth.decorator';
// import { UpdateDto } from './dto/update.dto';
// import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { UserModel } from './user.model';
import { Types } from 'mongoose';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	public async getProfile() {
		return this.userService.byId();
	}

	// @UsePipes(new ValidationPipe())
	// @Put('profile')
	// @HttpCode(200)
	// @Auth()
	// public async updateProfile(
	// 	@User('_id') _id: string,
	// 	@Body() data: UpdateDto
	// ) {
	// 	return this.userService.updateProfile(_id, data);
	// }

	// @Get('profile/favorites')
	// @Auth()
	// public async getFavorites(@User('_id') _id: string) {
	// 	return this.userService.getFavoriteMovies(_id);
	// }

	// @Post('profile/favorites')
	// @HttpCode(200)
	// @Auth()
	// public async toggleFavorite(
	// 	@Body('movieId', IdValidationPipe) movieId: Types.ObjectId,
	// 	@User() user: UserModel
	// ) {
	// 	return this.userService.toggleFavorite(movieId, user);
	// }

	// @Get('count')
	// @Auth('admin')
	// public async getCountUsers() {
	// 	return this.userService.getCount();
	// }

	// @Get()
	// @Auth('admin')
	// public async getUsers(@Query('searchTerm') searchTerm?: string) {
	// 	return this.userService.getAll(searchTerm);
	// }

	// @Get(':id')
	// @Auth('admin')
	// public async getUser(@Param('id', IdValidationPipe) id: string) {
	// 	return this.userService.byId(id);
	// }

	// @UsePipes(new ValidationPipe())
	// @Put(':id')
	// @HttpCode(200)
	// @Auth('admin')
	// public async updateUser(
	// 	@Param('id', IdValidationPipe) id: string,
	// 	@Body() data: UpdateDto
	// ) {
	// 	return this.userService.updateProfile(id, data);
	// }

	// @Delete(':id')
	// @Auth('admin')
	// public async delete(@Param('id', IdValidationPipe) id: string) {
	// 	const deletedDoc = await this.userService.delete(id);
	// 	if (!deletedDoc) throw new NotFoundException('Movie not found');
	// }
}
