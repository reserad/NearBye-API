import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentGetInput {
  @Field()
  commentId!: string;
}

@ArgsType()
export class CommentGetInputArgs {
  @Field(() => CommentGetInput)
  commentGetInput!: CommentGetInput;
}
