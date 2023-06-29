import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { UserPost } from './types/post.type';
import { JwtUser } from '../auth/types/jwt-user.type';
import { PostGetAllInput } from './types/post-get-all.input';

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
    return await this.apiService.get<UserPost[]>(
      this.endPoints.posts,
      jwtUser,
      {},
      postGetAllInput,
    );
  }
}
