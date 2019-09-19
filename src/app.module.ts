import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleModule } from 'nestjs-console';
import * as dotenv from 'dotenv';
dotenv.config();

import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { BootstrapModule } from 'modules/bootstrap/bootstrap.module';
import { RoleModule } from 'modules/role/role.module';

@Module({
  imports: [
    ConsoleModule,
    MongooseModule.forRoot('mongodb://localhost/nest-boilerplate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    BootstrapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
