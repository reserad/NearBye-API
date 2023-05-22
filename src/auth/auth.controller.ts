import { Controller } from '@nestjs/common';

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
