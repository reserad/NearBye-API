import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService
	) { }

	@UseGuards(JwtAuthGuard)
	@Get('/user/:id')
	async verifyMagicLinkCode(@Param('id') id: string) {
		const user = await this.userService.getById(id);
		if (user) {
			return user;
		}

		throw new HttpException('User not found', HttpStatus.NOT_FOUND);
	}
}