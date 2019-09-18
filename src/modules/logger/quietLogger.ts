import { LoggerService } from '@nestjs/common';

export class QuietLogger implements LoggerService {
  log(message: string) {
    console.log(message);
  }
  error(message: string, trace: string) {
    console.log(message);
    console.trace(trace);
  }
  warn(message: string) {
    console.log(message);
  }
}
