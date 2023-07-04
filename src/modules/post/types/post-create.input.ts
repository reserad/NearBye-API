import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field()
  body!: string;

  @Field()
  userId!: string;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;
}

@ArgsType()
export class PostCreateInputArgs {
  @Field(() => PostCreateInput)
  postCreateInput!: PostCreateInput;
}
