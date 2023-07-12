import { Field, ObjectType } from '@nestjs/graphql';
import { VoteStatus } from './vote-status.enum';
import { User } from 'src/modules/user/types/user.type';
import { Vote } from 'src/modules/vote/types/vote.type';
import { Comment } from 'src/modules/comment/types/comment-type';

@ObjectType()
export class UserPost {
  @Field()
  id!: string;

  @Field()
  body!: string;

  @Field()
  createdAt!: string;

  @Field()
  authorId!: string;

  @Field(() => User)
  author!: User;

  @Field(() => [Comment])
  comments!: Comment[];

  @Field(() => [Vote])
  votes!: Vote[];

  @Field(() => VoteStatus)
  userVoteStatus!: VoteStatus;

  @Field()
  score!: number;
}
