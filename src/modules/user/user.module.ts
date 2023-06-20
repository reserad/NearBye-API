import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '../api/api.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [ConfigModule, ApiModule],
  providers: [UserResolver, UserService],
  exports: [UserModule, UserService],
})
export class UserModule {}
