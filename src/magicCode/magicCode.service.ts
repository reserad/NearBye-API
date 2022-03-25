import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import { PrismaService } from "src/shared/prisma.service";

@Injectable()
export class MagicCodeService {
    constructor(private prismaService: PrismaService) {}

    async getMagicCode(userId: string, code: string) {
		return await this.prismaService.magicCode.findFirst({
			where: {
				code,
                userId,
				createdAt: {
					gt: moment().subtract(15, 'minutes').toISOString()
				}
			}
		});
	}

    async create(userId: string) {
		return await this.prismaService.magicCode.create({
			data: {
				userId,
				createdAt: moment().toISOString(),
				code: (Math.random() * 1000000000+999999).toFixed(0).substring(0, 5)
			}
		});
    }
}