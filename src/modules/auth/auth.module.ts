import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ApiModule } from '../api/api.module';
import { AuthResolver } from './auth.resolver';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, PassportModule, ApiModule],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
