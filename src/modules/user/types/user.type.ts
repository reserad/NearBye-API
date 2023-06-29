import { Field, ObjectType } from '@nestjs/graphql';
import { Proifle } from 'src/modules/profile/types/profile.type';

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

  @Field()
  profile: Proifle;
}
