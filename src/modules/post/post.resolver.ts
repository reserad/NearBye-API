import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { UserPost } from './types/post.type';
import { GqlJwtGuard } from '../auth/gql-jwt.guard';
import { JwtUser } from '../auth/types/jwt-user.type';
import { Jwt } from '../user/jwt.decorator';
import { PostGetAllInputArgs } from './types/post-get-all.input';

@Resolver(() => UserPost)
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => [UserPost])
  async postGetAll(
    @Jwt() jwtUser: JwtUser,
    @Args() { postGetAllInput }: PostGetAllInputArgs,
  ): Promise<UserPost[]> {
    return await this.postService.getUserPosts(jwtUser, postGetAllInput);
  }
}
