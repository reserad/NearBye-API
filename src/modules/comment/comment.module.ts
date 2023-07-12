import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '../api/api.module';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [ConfigModule, ApiModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentModule, CommentService],
})
export class CommentModule {}
