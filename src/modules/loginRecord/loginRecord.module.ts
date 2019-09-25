import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LoginRecordService } from './loginRecord.service';
import { LoginRecordResolver } from './loginRecord.resolver';
import { LoginRecord } from './loginRecord.schema';

@Module({
  imports: [TypegooseModule.forFeature([LoginRecord])],
  controllers: [],
  providers: [LoginRecordService, LoginRecordResolver],
  exports: [LoginRecordService],
})
export class LoginRecordModule {}
