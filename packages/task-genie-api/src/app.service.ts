import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
   
    return 'Setting up API for task genie!';
  }
}
