import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/shared/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	imports: [],
	providers: [PrismaService, UserService, {
		provide: APP_GUARD,
		useClass: JwtAuthGuard
	}],
	exports: [UserModule]
})
export class UserModule {}