import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class OtpSendInput {
  @Field()
  phoneNumber!: string;
}

@ArgsType()
export class OtpSendInputArgs {
  @Field(() => OtpSendInput)
  otpSendInput!: OtpSendInput;
}
