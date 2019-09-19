import { Module } from '@nestjs/common';
import { BootstrapConsole } from 'modules/bootstrap/bootstrap.console';

@Module({
  providers: [BootstrapConsole],
})
export class BootstrapModule {}
