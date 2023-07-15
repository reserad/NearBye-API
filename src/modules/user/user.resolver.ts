import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { User } from './types/user.type';
import { GqlJwtGuard } from '../auth/gql-jwt.guard';
import { Jwt } from './jwt.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { UserUpdateInputArgs } from './types/user-update-input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => User)
  async userGet(@Jwt() jwtUser: JwtUser): Promise<User> {
    return await this.userService.getCurrentUser(jwtUser);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => User)
  async userUpdate(
    @Jwt() jwtUser: JwtUser,
    @Args() { userUpdateInput }: UserUpdateInputArgs,
  ): Promise<User> {
    return await this.userService.update(jwtUser, userUpdateInput);
  }
}
