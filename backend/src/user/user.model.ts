import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	public email: string;

	@prop()
	public password: string;

	@prop({ default: false })
	public isAdmin?: boolean;
}
