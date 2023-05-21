import { AuthTokenType } from './auth-token-type';

export type JwtPayloadType = {
  id: string;
  email: string;
  token: AuthTokenType;
};
