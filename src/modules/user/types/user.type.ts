import { Field, Int, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field({ name: 'phone_number' })
  phoneNumber!: string;

  @Field({ nullable: true, name: 'base_latitude' })
  baseLatitude?: number;

  @Field({ nullable: true, name: 'base_longitude' })
  baseLongitude?: number;

  @Field({ name: 'created_at' })
  createdAt!: string;
}
