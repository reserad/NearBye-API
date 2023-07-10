import { Field, ObjectType } from '@nestjs/graphql';

import { VoteStatus } from './vote-status.enum';

@ObjectType()
export class FeedItem {
  @Field()
  id!: string;

  @Field()
  body!: string;

  @Field()
  createdAt!: string;

  @Field()
  upvotes!: number;

  @Field()
  downvotes!: number;

  @Field(() => VoteStatus)
  userVoteStatus!: VoteStatus;

  @Field()
  authorId!: string;

  @Field({ nullable: true })
  authorName?: string;

  @Field({ nullable: true })
  authorImage?: string;

  @Field()
  commentCount!: number;
}
