import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostGetInput {
  @Field()
  postId!: string;
}

@ArgsType()
export class PostGetInputArgs {
  @Field(() => PostGetInput)
  postGetInput!: PostGetInput;
}
