import { ArgsType, Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class PostCreateInput {
  @Field(() => GraphQLJSON)
  body!: JSON;

  @Field(() => [String], { nullable: true })
  imageUrls?: string[];

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
