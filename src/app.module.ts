import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AppConfigModule } from "./app-config/app-config.module";

import { EnvironmentVariables, envSchema } from "./app-config/app-config";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        const result = envSchema.safeParse(config);

        if (!result.success) {
          throw new Error(
            `Config validation error: ${result.error.toString()}`,
          );
        }

        return result.data as EnvironmentVariables;
      },
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    AppConfigModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
