import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Proifle {
  @Field()
  id!: string;

  @Field()
  userId!: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  name?: string;
}
