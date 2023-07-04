import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { UserPost } from './types/post.type';
import { JwtUser } from '../auth/types/jwt-user.type';
import { PostGetAllInput } from './types/post-get-all.input';
import { PostCreateInput } from './types/post-create.input';
import { RequestConfig } from '../api/types/request-config.type';

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
  async getUserPosts(
    jwtUser: JwtUser,
    postGetAllInput: PostGetAllInput,
  ): Promise<UserPost[]> {
    const config: RequestConfig = {
      url: this.endPoints.posts,
      jwtUser,
      data: postGetAllInput,
    };
    return await this.apiService.get<UserPost[]>(config);
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
}
