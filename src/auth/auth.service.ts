import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { MagicCodeService } from 'src/magicCode/magicCode.service';
import { PrismaService } from 'src/shared/prisma.service';
import twilioService from 'src/shared/twilio.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
		private prismaService: PrismaService, 
		private userService: UserService,
		private magicCodeService: MagicCodeService, 
		private jwtService: JwtService
	) {}

    async createMagicCode(phoneNumber: string) {
		let user = await this.userService.getByPhone(phoneNumber);
		if (!user) {
			user = await this.prismaService.user.create({
				data: {
					phoneNumber,
					username: ''
				}
			});
		}

		const magicCode = await this.magicCodeService.create(user.id);

		if (magicCode) {
			await twilioService.sendMessage(phoneNumber, magicCode.code);
		} else {
			throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }

	async login(userId: string) {
		const user = await this.userService.getById(userId);
		return this.jwtService.sign({phoneNumber: user.phoneNumber, sub: user.id});
	}

	async verifyCode(phoneNumber: string, code: string) {
		const user = await this.userService.getByPhone(phoneNumber);
		const magicCode = await this.prismaService.magicCode.findFirst({
			where: {
				code,
                userId: user.id,
				createdAt: {
					gt: moment().subtract(15, 'minutes').toISOString()
				}
			}
		});

		if (magicCode) {
			return user;
		}
		
		return null;
	}
}