import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";

@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get("me")
  getHello(@Request() req) {
    return req.user;
  }
}
