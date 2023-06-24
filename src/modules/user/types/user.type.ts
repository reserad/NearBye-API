import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field()
  phoneNumber!: string;

  @Field({ nullable: true })
  baseLatitude?: number;

  @Field({ nullable: true })
  baseLongitude?: number;

  @Field()
  createdAt!: string;
}
