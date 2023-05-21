import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { OTPAuthGuard } from './otp-auth.guard';
import { Public } from 'src/shared/public.decorator';

export class LoginDto {
  phoneNumber: string;
}

export class VerifyMagicCodeDto {
  magicCode: string;
  phoneNumber: string;
}

@Controller()
export class AuthController {
  // constructor(
  // 	private readonly authService: AuthService,
  // 	private readonly userService: UserService,
  // ) { }
}
