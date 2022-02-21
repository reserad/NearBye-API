import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export class LoginDto {
  phoneNumber: string
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    await this.authService.sendMagicLink(loginDto.phoneNumber);
  }
}