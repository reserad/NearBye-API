import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpVerifyResult {
  @Field()
  token!: string;
}
