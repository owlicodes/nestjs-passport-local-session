import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentVariables } from "./app-config";

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  getPort(): string {
    return this.configService.get<number>("PORT", { infer: true })!;
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>("DATABASE_URL", { infer: true })!;
  }

  getSessionSecret(): string {
    return this.configService.get<string>("SESSION_SECRET", { infer: true })!;
  }
}
