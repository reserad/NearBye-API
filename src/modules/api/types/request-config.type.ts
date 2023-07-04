import { JwtUser } from 'src/modules/auth/types/jwt-user.type';

export type RequestConfig = {
  url: string;
  jwtUser?: JwtUser;
  headers?: Record<string, string>;
  data?: any;
};
