import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ConfigService } from '@nestjs/config';
import { EmptyAuthPayload } from './types/empty-auth-payload.type';
import { AxiosRequestConfig } from 'axios';
import { OtpSendInput } from './types/otp-send.input';
import { OtpVerifyResult } from './types/otp-verify-result.type';
import { OtpVerifyInput } from './types/otp-verify.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private baseUrl = this.configService.get<string>('BACKEND_BASE_URL');

  private endPoints = {
    auth: `${this.baseUrl}/auth`,
  };
  async sendOtp(input: OtpSendInput): Promise<EmptyAuthPayload> {
    const config: AxiosRequestConfig = {
      url: `${this.endPoints.auth}/send`,
      data: input,
    };
    await this.apiService.post<void>(config);
    return { success: true };
  }

  async verify(input: OtpVerifyInput): Promise<OtpVerifyResult> {
    const config: AxiosRequestConfig = {
      url: `${this.endPoints.auth}/verify`,
      data: input,
    };
    return await this.apiService.post<OtpVerifyResult>(config);
  }

  async signOut(): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endPoints.auth}/signout`,
    };
    await this.apiService.post<OtpVerifyResult>(config);
  }
}
