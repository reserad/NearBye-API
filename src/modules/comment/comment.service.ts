import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { JwtUser } from '../auth/types/jwt-user.type';
import { RequestConfig } from '../api/types/request-config.type';
import { Comment } from './types/comment-type';
import { CommentGetInput } from './types/comment-get-input';

@Injectable()
export class CommentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private baseUrl = this.configService.get<string>('BACKEND_BASE_URL');

  private endPoints = {
    comments: `${this.baseUrl}/comments`,
  };
  async getComment(
    jwtUser: JwtUser,
    commentGetInput: CommentGetInput,
  ): Promise<Comment> {
    const config: RequestConfig = {
      url: `${this.endPoints.comments}/${commentGetInput.commentId}`,
      jwtUser,
    };
    return await this.apiService.get<Comment>(config);
  }
}
