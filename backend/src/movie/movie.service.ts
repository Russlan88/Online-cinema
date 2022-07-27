import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateMovieDto } from './dto/create-movie.dto';
import { MovieModel } from './movie.model';

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>
	) {}

	public async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm)
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			};

		return this.MovieModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.populate('actors genres')
			.exec();
	}

	public async bySlug(slug: string) {
		const doc = await this.MovieModel.findOne({ slug })
			.populate('actors genres')
			.exec();

		if (!doc) throw new NotFoundException('Movie not found!');

		return doc;
	}

	public async byActor(
		actorId: Types.ObjectId
	): Promise<DocumentType<MovieModel>[]> {
		return this.MovieModel.find({ actors: actorId }).exec();
	}

	public async byGenres(
		genreIds: Types.ObjectId[]
	): Promise<DocumentType<MovieModel>[]> {
		return this.MovieModel.find({ genres: { $in: genreIds } }).exec();
	}

	public async getMostPopular() {
		return await this.MovieModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec();
	}

	public async updateCountOpened(slug: string) {
		const updateDoc = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{ $inc: { countOpened: 1 } },
			{
				new: true,
			}
		).exec();
		if (!updateDoc) throw new NotFoundException('Movie not found');
		return updateDoc;
	}

	/* Admin place */

	public async byId(_id: string) {
		const doc = await this.MovieModel.findById(_id);
		if (!doc) throw new NotFoundException('Movie not found');

		return doc;
	}

	public async create(): Promise<Types.ObjectId> {
		const defaultValue: UpdateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		};
		const movie = await this.MovieModel.create(defaultValue);
		return movie._id;
	}

	public async update(_id: string, dto: UpdateMovieDto) {
		const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec();

		if (!updateDoc) throw new NotFoundException('Movie not found');

		return updateDoc;
	}

	public async delete(id: string) {
		const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec();

		if (!deleteDoc) throw new NotFoundException('Movie not found');

		return deleteDoc;
	}
}
