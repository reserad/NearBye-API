import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { Post } from './types/post.type';
import { JwtUser } from '../auth/types/jwt-user.type';
import { FeedGetInput } from './types/feed-get.input';
import { PostCreateInput } from './types/post-create.input';
import { RequestConfig } from '../api/types/request-config.type';
import { FeedItem } from './types/feed-item.type';
import { PostVoteInput } from './types/post-vote.input';
import { PostGetInput } from './types/post-get-input';

@Injectable()
export class PostService {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private baseUrl = this.configService.get<string>('BACKEND_BASE_URL');

  private endPoints = {
    posts: `${this.baseUrl}/posts`,
    vote: `${this.baseUrl}/posts/vote`,
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

  async getPost(jwtUser: JwtUser, postGetInput: PostGetInput): Promise<Post> {
    const config: RequestConfig = {
      url: `${this.endPoints.posts}/${postGetInput.postId}`,
      jwtUser,
    };
    return await this.apiService.get<Post>(config);
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

  async vote(jwtUser: JwtUser, postVoteInput: PostVoteInput): Promise<Post> {
    const config: RequestConfig = {
      url: this.endPoints.vote,
      jwtUser,
      data: postVoteInput,
    };
    return await this.apiService.post<Post>(config);
  }
}
