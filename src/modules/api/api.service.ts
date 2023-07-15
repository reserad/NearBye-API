import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RequestConfig } from './types/request-config.type';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}
  async get<T>({ url, data, headers, jwtUser }: RequestConfig) {
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

  async post<T>({ url, data, headers, jwtUser }: RequestConfig) {
    const headersPayload = {
      ...headers,
    };
    if (jwtUser) {
      headersPayload['authorization'] = jwtUser.token;
    }
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headersPayload,
      },
      url,
      data,
    };
    const result = await firstValueFrom(this.httpService.request<T>(options));
    return result.data;
  }

  async put<T>({ url, data, headers, jwtUser }: RequestConfig) {
    const headersPayload = {
      ...headers,
    };
    if (jwtUser) {
      headersPayload['authorization'] = jwtUser.token;
    }
    const options: AxiosRequestConfig = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headersPayload,
      },
      url,
      data,
    };
    const result = await firstValueFrom(this.httpService.request<T>(options));
    return result.data;
  }
}
