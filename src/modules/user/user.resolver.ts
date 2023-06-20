import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { User } from './types/user.type';
import { GqlJwtGuard } from '../auth/gql-jwt.guard';
import { Jwt } from './jwt.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => User)
  async userGet(@Jwt() jwtUser: JwtUser): Promise<User> {
    return await this.userService.getCurrentUser(jwtUser);
  }
}
