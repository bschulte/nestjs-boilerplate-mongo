import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { User } from 'modules/user/schemas/user.schema';
import { UserConsole } from 'modules/user/user.console';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserResolver, UserConsole],
  exports: [UserService],
})
export class UserModule {}
