import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '../api/api.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [ConfigModule, ApiModule],
  providers: [PostResolver, PostService],
  exports: [PostModule, PostService],
})
export class PostModule {}
