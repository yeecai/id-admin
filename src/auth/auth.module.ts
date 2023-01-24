import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratgy } from './jwt.strategy';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'abcdefg',
      signOptions: { expiresIn: '24h' }
    }),
    AdminModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratgy],
  exports: [AuthService]
})
export class AuthModule { }
