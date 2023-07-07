import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { Post } from './types/post.type';
import { JwtUser } from '../auth/types/jwt-user.type';
import { FeedGetInput } from './types/feed-get.input';
import { PostCreateInput } from './types/post-create.input';
import { RequestConfig } from '../api/types/request-config.type';
import { FeedItem } from './types/feed-item.type';

@Injectable()
export class PostService {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private baseUrl = this.configService.get<string>('BACKEND_BASE_URL');

  private endPoints = {
    posts: `${this.baseUrl}/posts`,
  };
  async getFeed(
    jwtUser: JwtUser,
    feedGetInput: FeedGetInput,
  ): Promise<FeedItem[]> {
    const config: RequestConfig = {
      url: this.endPoints.posts,
      jwtUser,
      data: feedGetInput,
    };
    return await this.apiService.get<FeedItem[]>(config);
  }

  async postCreate(
    jwtUser: JwtUser,
    postCreateInput: PostCreateInput,
  ): Promise<Post> {
    const config: RequestConfig = {
      url: this.endPoints.posts,
      jwtUser,
      data: postCreateInput,
    };
    return await this.apiService.post<Post>(config);
  }
}
