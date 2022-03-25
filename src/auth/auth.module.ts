import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MagicCodeService } from 'src/magicCode/magicCode.service';
import { FirebaseService } from 'src/shared/firebase.service';
import { PrismaService } from 'src/shared/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule, 
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '7d'}
        })
    ],
    providers: [
        PrismaService, 
        FirebaseService, 
        AuthService, 
        UserService,
        MagicCodeService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: [AuthService]
})
export class AuthModule {}