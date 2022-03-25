import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'OTPStrategy') {
    constructor(
        private authService: AuthService
    ) {
        super({
            usernameField: 'phoneNumber',
            passwordField: 'code',
          });
    }

    async validate(phoneNumber: string , code: string): Promise<any> {
        const user = await this.authService.verifyCode(phoneNumber, code);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}