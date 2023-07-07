import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class FeedGetInput {
  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @Field()
  take!: number;

  @Field()
  offset!: number;
}

@ArgsType()
export class FeedGetInputArgs {
  @Field(() => FeedGetInput)
  feedGetInput!: FeedGetInput;
}
