import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // For development purpose: will be deleted later
  async getAllUserTest() {
    const allUser = await this.usersService.findAllUserTest();
    return allUser;
  }
  // ----------------------------------------------

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(phoneNumber);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
