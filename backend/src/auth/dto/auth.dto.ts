import { IsString, MinLength } from 'class-validator';

export class AuthDto {
	@IsString()
	public email: string;

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	public password: string;
}
