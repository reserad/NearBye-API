import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/types/user.type';
import { Vote } from 'src/modules/vote/types/vote.type';

@ObjectType()
export class UserVote {
  @Field()
  id!: string;

  @Field()
  voteId!: string;

  @Field()
  authorId!: string;

  @Field(() => User)
  author!: User;

  @Field(() => Vote)
  vote!: Vote;
}
