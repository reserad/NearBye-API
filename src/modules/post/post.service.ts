import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { Post } from './types/post.type';
import { JwtUser } from '../auth/types/jwt-user.type';
import { FeedGetInput } from './types/feed-get.input';
import { PostCreateInput } from './types/post-create.input';
import { RequestConfig } from '../api/types/request-config.type';
import { UserPost } from './types/user-post';
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
  ): Promise<UserPost[]> {
    const config: RequestConfig = {
      url: this.endPoints.posts,
      jwtUser,
      data: feedGetInput,
    };
    return await this.apiService.get<UserPost[]>(config);
  }

  async getPost(
    jwtUser: JwtUser,
    postGetInput: PostGetInput,
  ): Promise<UserPost> {
    const config: RequestConfig = {
      url: `${this.endPoints.posts}/${postGetInput.postId}`,
      jwtUser,
    };
    return await this.apiService.get<UserPost>(config);
  }

  async postCreate(
    jwtUser: JwtUser,
    postCreateInput: PostCreateInput,
  ): Promise<UserPost> {
    const config: RequestConfig = {
      url: this.endPoints.posts,
      jwtUser,
      data: postCreateInput,
    };
    return await this.apiService.post<UserPost>(config);
  }

  async vote(jwtUser: JwtUser, postVoteInput: PostVoteInput): Promise<void> {
    const config: RequestConfig = {
      url: this.endPoints.vote,
      jwtUser,
      data: postVoteInput,
    };
    await this.apiService.post<Post>(config);
  }
}
