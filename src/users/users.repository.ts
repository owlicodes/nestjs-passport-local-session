import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUserByUsername(username: string) {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }
}
