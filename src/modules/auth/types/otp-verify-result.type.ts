import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpVerifyUser {
  @Field()
  id!: string;

  @Field()
  phoneNumber!: string;
}

@ObjectType()
export class OtpVerifyResult {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;

  @Field()
  tokenId!: string;

  @Field()
  user!: OtpVerifyUser;
}
