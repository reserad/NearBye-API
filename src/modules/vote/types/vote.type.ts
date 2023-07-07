import { Field, ObjectType } from '@nestjs/graphql';
import { UserVote } from 'src/modules/user/types/user-vote.type';

@ObjectType()
export class Vote {
  @Field()
  id!: string;

  @Field()
  postId!: string;

  @Field(() => Boolean, { nullable: true })
  upvoted?: boolean;

  @Field(() => Boolean, { nullable: true })
  downvoted?: boolean;

  @Field(() => UserVote)
  userVote!: UserVote;
}
