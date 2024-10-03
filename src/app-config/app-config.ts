import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(15),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;
