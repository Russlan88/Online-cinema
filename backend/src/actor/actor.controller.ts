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
import { GenreService } from 'src/genre/genre.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('by-slug/:slug')
	public async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug);
	}

	@Get()
	public async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm);
	}
	@Get(':id')
	@Auth('admin')
	public async get(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	public async create() {
		return this.actorService.create();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	public async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ActorDto
	) {
		const actor = await this.actorService.update(id, dto);
		return actor;
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	public async delete(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.delete(id);
	}
}
