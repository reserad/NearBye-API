import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class OtpVerifyInput {
  @Field()
  phoneNumber!: string;

  @Field()
  code!: string;
}

@ArgsType()
export class OtpVerifyInputArgs {
  @Field(() => OtpVerifyInput)
  otpVerifyInput!: OtpVerifyInput;
}
