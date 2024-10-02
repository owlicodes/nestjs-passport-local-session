import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
