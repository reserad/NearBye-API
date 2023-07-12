import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/types/user.type';

@ObjectType()
export class Comment {
  @Field()
  id!: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field(() => Comment, { nullable: true })
  parent?: Comment;

  @Field(() => [Comment])
  children!: Comment[];

  @Field()
  authorId!: string;

  @Field(() => User)
  author!: User;

  @Field()
  body!: string;

  @Field()
  createdAt!: string;
}
