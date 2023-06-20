import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmptyAuthPayload {
  @Field()
  success!: boolean;
}
