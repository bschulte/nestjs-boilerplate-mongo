import { Module } from '@nestjs/common';
import { QuietLogger } from './QuietLogger';

@Module({
  providers: [QuietLogger],
  exports: [QuietLogger]
})
export class QuietLoggerModule {}
