import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { MagicCodeService } from './magicCode.service';

@Module({
	imports: [],
	providers: [PrismaService, MagicCodeService],
	exports: [MagicCodeModule]
})
export class MagicCodeModule {}