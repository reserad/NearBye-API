import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field()
  id!: string;

  @Field()
  postId!: string;

  @Field()
  userId!: string;

  @Field(() => Boolean, { nullable: true })
  upvoted?: boolean;

  @Field(() => Boolean, { nullable: true })
  downvoted?: boolean;
}
