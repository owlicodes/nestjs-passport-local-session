import { Injectable } from "@nestjs/common";

import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findUserByUsername(username: string) {
    return this.usersRepository.findUserByUsername(username);
  }
}
