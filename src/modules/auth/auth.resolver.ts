import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { EmptyAuthPayload } from './types/empty-auth-payload.type';
import { OtpSendInputArgs } from './types/otp-send.input';
import { OtpVerifyInputArgs } from './types/otp-verify.input';
import { OtpVerifyResult } from './types/otp-verify-result.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => EmptyAuthPayload)
  async sendOtp(
    @Args() { otpSendInput }: OtpSendInputArgs,
  ): Promise<EmptyAuthPayload> {
    return await this.authService.sendOtp(otpSendInput);
  }

  @Mutation(() => OtpVerifyResult)
  async verifyOtp(
    @Args() { otpVerifyInput }: OtpVerifyInputArgs,
  ): Promise<OtpVerifyResult> {
    return await this.authService.verify(otpVerifyInput);
  }
}
