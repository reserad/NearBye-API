import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { VoteType } from './vote-type.enum';

@InputType()
export class PostVoteInput {
  @Field()
  postId!: string;

  @Field(() => VoteType)
  type!: VoteType;
}

@ArgsType()
export class PostVoteInputArgs {
  @Field(() => PostVoteInput)
  postVoteInput!: PostVoteInput;
}
