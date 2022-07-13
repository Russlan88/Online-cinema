import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getJwtConfig = async (
	confiService: ConfigService,
): Promise<JwtModuleOptions> => ({
	secret: confiService.get('JWT_SECRET'),
});
