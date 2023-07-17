import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/modules/comment/types/comment-type';
import { User } from 'src/modules/user/types/user.type';
import { Vote } from 'src/modules/vote/types/vote.type';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Post {
  @Field()
  id!: string;

  @Field(() => GraphQLJSON)
  body!: JSON;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;

  @Field()
  createdAt!: string;

  @Field(() => User)
  author!: User;

  @Field(() => [Vote])
  votes!: Vote[];

  @Field(() => [Comment])
  comments!: Comment[];
}
