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
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/Auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { UpdateMovieDto } from './dto/create-movie.dto';
import { GenreIdsDto } from './dto/genreIds.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('by-slug/:slug')
	public async bySlug(@Param('slug') slug: string) {
		return this.movieService.bySlug(slug);
	}

	@Get('by-actor/:actorId')
	public async byActor(
		@Param('actorId', IdValidationPipe) actorId: Types.ObjectId
	) {
		return this.movieService.byActor(actorId);
	}

	@UsePipes(new ValidationPipe())
	@Post('by-genres')
	@HttpCode(200)
	public async byGenres(@Body() { genreIds }: GenreIdsDto) {
		return this.movieService.byGenres(genreIds);
	}

	@Get()
	public async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm);
	}

	@Get('most-popular')
	public async getMostPopular() {
		return this.movieService.getMostPopular();
	}

	@Put('update-count-opened')
	@HttpCode(200)
	public async updateCountOpened(@Body('slug') slug: string) {
		return this.movieService.updateCountOpened(slug);
	}

	@Get(':id')
	@Auth('admin')
	public async get(@Param('id', IdValidationPipe) id: string) {
		return this.movieService.byId(id);
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	public async create() {
		return this.movieService.create();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	public async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateMovieDto
	) {
		const updateMovie = await this.movieService.update(id, dto);
		if (!updateMovie) throw new NotFoundException('Movie not found');
		return updateMovie;
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	public async delete(@Param('id', IdValidationPipe) id: string) {
		return this.movieService.delete(id);
	}
}
