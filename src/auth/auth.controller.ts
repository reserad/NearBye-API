import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicCodeService } from 'src/magicCode/magicCode.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { OTPAuthGuard } from './otp-auth.guard';
import { Public } from 'src/shared/public.decorator';

export class LoginDto {
	phoneNumber: string
}

export class VerifyMagicCodeDto {
	magicCode: string;
	phoneNumber: string;
}

@Controller()
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly magicCodeService: MagicCodeService
	) { }

	@Public()
	@Post('/login')
	async login(@Body() loginDto: LoginDto) {
		return await this.authService.createMagicCode(loginDto.phoneNumber);
	}

	@Public()
	@Post('/verifyMagicCode')
	async verifyMagicCode(@Req() req: Request, @Body() verifyMagicCodeDto: VerifyMagicCodeDto) {
		const {phoneNumber, magicCode} = verifyMagicCodeDto;
		const user = await this.userService.getByPhone(phoneNumber);
		if (user) {
			const result = await this.magicCodeService.getMagicCode(user.id, magicCode);
			if (result) {
				req.headers.authorization = await this.authService.login(result.userId);
				return req.user;
			}
		}

		throw new HttpException('Code was invalid or expired', HttpStatus.NOT_FOUND);
	}
}