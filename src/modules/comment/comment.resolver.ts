import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from '../auth/gql-jwt.guard';
import { JwtUser } from '../auth/types/jwt-user.type';
import { Jwt } from '../user/jwt.decorator';
import { CommentGetInputArgs } from './types/comment-get-input';
import { Comment } from './types/comment-type';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => Comment)
  async commentGet(
    @Jwt() jwtUser: JwtUser,
    @Args() { commentGetInput }: CommentGetInputArgs,
  ): Promise<Comment> {
    return await this.commentService.getComment(jwtUser, commentGetInput);
  }
}
