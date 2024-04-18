import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  signIn(): string {
    return 'Nahim Hossain Shohan!';
  }
}
