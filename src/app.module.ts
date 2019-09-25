import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConsoleModule } from 'nestjs-console';
import * as dotenv from 'dotenv';
dotenv.config();

import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { BootstrapModule } from 'modules/bootstrap/bootstrap.module';
import { GraphQLModule } from '@nestjs/graphql';
import { isDevEnv } from 'common/util';

@Module({
  imports: [
    ConsoleModule,
    GraphQLModule.forRoot({
      playground: isDevEnv(),
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    TypegooseModule.forRoot('mongodb://localhost/nest-boilerplate', {
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
