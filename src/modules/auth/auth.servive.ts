import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiService } from '../api/api.service';
import { OtpSendInput } from './types/otp-send.input';
import { EmptyAuthPayload } from './types/empty-auth-payload.type';
import { OtpVerifyInput } from './types/otp-verify.input';
import { OtpVerifyResult } from './types/otp-verify-result.type';
import { RequestConfig } from '../api/types/request-config.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private baseUrl = this.configService.get<string>('AUTH_SERVICE_URL');

  private endPoints = {
    auth: `${this.baseUrl}/auth`,
  };
  async sendOtp(input: OtpSendInput): Promise<EmptyAuthPayload> {
    const config: RequestConfig = {
      url: `${this.endPoints.auth}/send`,
      data: input,
    };
    await this.apiService.post<void>(config);
    return { success: true };
  }

  async verify(input: OtpVerifyInput): Promise<OtpVerifyResult> {
    const config: RequestConfig = {
      url: `${this.endPoints.auth}/verify`,
      data: input,
    };
    return await this.apiService.post<OtpVerifyResult>(config);
  }
}
