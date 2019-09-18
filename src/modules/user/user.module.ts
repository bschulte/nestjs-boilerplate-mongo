import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { AuthModule } from 'src/auth/auth.module';
import { UserResolver } from './user.resolver';
// import { RoleModule } from 'src/role/role.module';
// import { UserConfigModule } from 'src/userConfig/userConfig.module';
// import { LoginRecordModule } from 'src/loginRecord/loginRecord.module';
// import { NotificationStatusModule } from 'src/notificationStatus/notificationStatus.module';
import { UserCommand } from './user.command';

@Module({
  imports: [
    // RoleModule,
    // UserConfigModule,
    // forwardRef(() => LoginRecordModule),
    // NotificationStatusModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver, UserCommand],
  exports: [UserService],
})
export class UserModule {}
