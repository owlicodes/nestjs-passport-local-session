import { Controller, Post, Request, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return req.user;
  }

  @Post("logout")
  logout(@Request() req) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
    });

    req.logout(() => {});

    return { message: "The user session has ended" };
  }
}
