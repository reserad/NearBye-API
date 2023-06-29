import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { JwtUser } from '../auth/types/jwt-user.type';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}
  async get<T>(
    url: string,
    jwtUser?: JwtUser,
    headers?: Record<string, string>,
    data?: any,
  ) {
    const headersPayload = {
      ...headers,
    };
    if (jwtUser) {
      headersPayload['authorization'] = jwtUser.token;
    }
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headersPayload,
      },
      url,
      data,
    };
    const result = await firstValueFrom(this.httpService.request<T>(config));
    return result.data;
  }

  async post<T>({ url, headers, data = {} }: AxiosRequestConfig) {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data,
    };
    console.log(options);
    const result = await firstValueFrom(this.httpService.request<T>(options));
    return result.data;
  }
}
