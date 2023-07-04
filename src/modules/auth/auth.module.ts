import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ApiModule } from '../api/api.module';
import { ConfigModule } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.servive';
import { UserService } from '../user/user.service';

@Module({
  imports: [ConfigModule, PassportModule, ApiModule],
  providers: [JwtStrategy, AuthResolver, AuthService, UserService],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
