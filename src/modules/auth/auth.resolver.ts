import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.servive';
import { EmptyAuthPayload } from './types/empty-auth-payload.type';
import { OtpSendInputArgs } from './types/otp-send.input';
import { OtpVerifyResult } from './types/otp-verify-result.type';
import { OtpVerifyInputArgs } from './types/otp-verify.input';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => EmptyAuthPayload)
  async sendOtp(
    @Args() { otpSendInput }: OtpSendInputArgs,
  ): Promise<EmptyAuthPayload> {
    const user = await this.userService.createUser(otpSendInput);
    return await this.authService.sendOtp(otpSendInput);
  }

  @Mutation(() => OtpVerifyResult)
  async verifyOtp(
    @Args() { otpVerifyInput }: OtpVerifyInputArgs,
  ): Promise<OtpVerifyResult> {
    return await this.authService.verify(otpVerifyInput);
  }
}
