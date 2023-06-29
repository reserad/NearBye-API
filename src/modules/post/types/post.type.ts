import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/types/user.type';

@ObjectType()
export class UserPost {
  @Field()
  id!: string;

  @Field()
  body!: string;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;

  @Field()
  createdAt!: string;

  @Field()
  author!: User;
}
