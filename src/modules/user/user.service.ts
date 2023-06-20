import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { User } from './types/user.type';
import { JwtUser } from '../auth/types/jwt-user.type';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private baseUrl = this.configService.get<string>('BACKEND_BASE_URL');

  private endPoints = {
    users: `${this.baseUrl}/users`,
  };
  async getCurrentUser(jwtUser: JwtUser): Promise<User> {
    return await this.apiService.get<User>(this.endPoints.users, jwtUser);
  }
}
