import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { AuthModule } from 'src/auth/auth.module';
import { UserResolver } from './user.resolver';
// import { UserConfigModule } from 'src/userConfig/userConfig.module';
// import { LoginRecordModule } from 'src/loginRecord/loginRecord.module';
// import { NotificationStatusModule } from 'src/notificationStatus/notificationStatus.module';
import { User } from 'modules/user/schemas/user.schema';
import { UserConsole } from 'modules/user/user.console';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    // UserConfigModule,
    // forwardRef(() => LoginRecordModule),
    // NotificationStatusModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver, UserConsole],
  exports: [UserService],
})
export class UserModule {}
