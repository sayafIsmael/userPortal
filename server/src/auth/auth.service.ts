import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = {username: 'john', password: '$2a$12$0ZW3wnVWzRBr0YF.iAMZ3OyVFROgMlNtf68LSStysZZ2xV6vBRqx6'};
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}