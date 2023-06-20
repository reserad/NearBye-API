import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtUser } from '../auth/types/jwt-user.type';

export const Jwt = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtUser => {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.authorization;
    const { id, phoneNumber } = ctx.getContext().req.user;
    return {
      id,
      phoneNumber,
      token,
    };
  },
);
