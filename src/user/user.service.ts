import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getById(userId: string) {
        return await this.prisma.user.findFirst({
            where: {
                id: userId
            }
        });
    }

    async getByPhone(phoneNumber: string) {
        return await this.prisma.user.findFirst({
            where: {
                phoneNumber
            }
        });
    }
}