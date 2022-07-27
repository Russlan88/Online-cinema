import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/Auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	public async bySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug);
	}

	@Get('/collections')
	public async getCountUsers() {
		return this.genreService.getCollections();
	}

	@Get()
	public async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.genreService.getAll(searchTerm);
	}
	@Get(':id')
	@Auth('admin')
	public async get(@Param('id', IdValidationPipe) id: string) {
		return this.genreService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	public async create() {
		return this.genreService.create();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	public async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateGenreDto
	) {
		const genre = await this.genreService.update(id, dto);
		return genre;
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	public async delete(@Param('id', IdValidationPipe) id: string) {
		return this.genreService.delete(id);
	}
}
