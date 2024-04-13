import { Injectable } from '@nestjs/common';
import usersData from '../../fakeDB/fakeUsers.json';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = usersData;

  // For development purpose: will be deleted later
  async findAllUserTest(): Promise<User[]> {
    return this.users;
  }
  // ----------------------------------------------

  async findOne(phoneNumber: string): Promise<User | undefined> {
    return this.users.find((user) => user.phoneNumber === phoneNumber);
  }
}
