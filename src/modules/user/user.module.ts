import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { AuthModule } from 'src/auth/auth.module';
import { UserResolver } from './user.resolver';
// import { RoleModule } from 'src/role/role.module';
// import { UserConfigModule } from 'src/userConfig/userConfig.module';
// import { LoginRecordModule } from 'src/loginRecord/loginRecord.module';
// import { NotificationStatusModule } from 'src/notificationStatus/notificationStatus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'modules/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // RoleModule,
    // UserConfigModule,
    // forwardRef(() => LoginRecordModule),
    // NotificationStatusModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
