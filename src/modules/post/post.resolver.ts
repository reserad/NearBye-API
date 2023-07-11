import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { Post } from './types/post.type';
import { GqlJwtGuard } from '../auth/gql-jwt.guard';
import { JwtUser } from '../auth/types/jwt-user.type';
import { Jwt } from '../user/jwt.decorator';
import { FeedGetInputArgs } from './types/feed-get.input';
import { PostCreateInputArgs } from './types/post-create.input';
import { EmptyVoteResponse } from './types/empty-vote-response.type';
import { PostVoteInputArgs } from './types/post-vote.input';
import { PostGetInputArgs } from './types/post-get-input';
import { UserPost } from './types/user-post';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => [UserPost])
  async feedGet(
    @Jwt() jwtUser: JwtUser,
    @Args() { feedGetInput }: FeedGetInputArgs,
  ): Promise<UserPost[]> {
    return await this.postService.getFeed(jwtUser, feedGetInput);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => UserPost)
  async postGet(
    @Jwt() jwtUser: JwtUser,
    @Args() { postGetInput }: PostGetInputArgs,
  ): Promise<Post> {
    return await this.postService.getPost(jwtUser, postGetInput);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Post)
  async postCreate(
    @Jwt() jwtUser: JwtUser,
    @Args() { postCreateInput }: PostCreateInputArgs,
  ): Promise<Post> {
    return await this.postService.postCreate(jwtUser, postCreateInput);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => EmptyVoteResponse)
  async postVote(
    @Jwt() jwtUser: JwtUser,
    @Args() { postVoteInput }: PostVoteInputArgs,
  ): Promise<EmptyVoteResponse> {
    await this.postService.vote(jwtUser, postVoteInput);
    return { success: true };
  }
}
