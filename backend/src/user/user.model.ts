import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
// import { MovieModel } from 'src/movie/movie.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	public email: string;

	@prop()
	public password: string;

	@prop({ default: false })
	public isAdmin?: boolean;

	// @prop({ default: [], ref: () => MovieModel })
	// favorites?: Ref<MovieModel>[]
}
