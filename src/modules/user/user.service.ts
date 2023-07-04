import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { User } from './types/user.type';
import { JwtUser } from '../auth/types/jwt-user.type';
import { RequestConfig } from '../api/types/request-config.type';
import { OtpSendInput } from '../auth/types/otp-send.input';

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
    const config: RequestConfig = {
      url: this.endPoints.users,
      jwtUser,
    };
    return await this.apiService.get<User>(config);
  }

  async createUser(otpSendInput: OtpSendInput) {
    const config: RequestConfig = {
      url: this.endPoints.users,
      data: otpSendInput,
    };
    return await this.apiService.post<User>(config);
  }
}
