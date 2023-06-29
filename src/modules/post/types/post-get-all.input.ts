import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostGetAllInput {
  @Field()
  latitude!: number;

  @Field()
  longitude!: number;
}

@ArgsType()
export class PostGetAllInputArgs {
  @Field(() => PostGetAllInput)
  postGetAllInput!: PostGetAllInput;
}
