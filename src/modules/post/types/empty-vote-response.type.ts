import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmptyVoteResponse {
  @Field()
  success!: boolean;
}
