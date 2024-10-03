import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import helmet from "helmet";
import Redis from "ioredis";
import RedisStore from "connect-redis";

import { AppModule } from "./app.module";
import { AppConfigService } from "./app-config/app-config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix("api");
  app.enableCors();
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "v",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const redisClient = new Redis({
    host: appConfigService.getRedisHost(), // Use 'redis' or the docker service name if your NestJS app is also dockerized
    port: appConfigService.getRedisPort(),
  });

  const redisStore = new RedisStore({
    client: redisClient,
  });

  app.use(
    session({
      store: redisStore,
      secret: appConfigService.getSessionSecret(),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 1000, // 30 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = appConfigService.getPort() || 5000;
  await app.listen(PORT);
}
bootstrap();
