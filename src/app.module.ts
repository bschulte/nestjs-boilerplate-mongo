import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConsoleModule } from 'nestjs-console';
import * as dotenv from 'dotenv';
dotenv.config();

import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { BootstrapModule } from 'modules/bootstrap/bootstrap.module';
import { authChecker } from 'modules/auth/guards/typegraphqlAuthChecker';
import { GraphQLModule } from '@nestjs/graphql';
import { isDevEnv } from 'common/util';
import { TypeGraphQLBuildSchemaOptions } from 'interfaces/ITypeGraphQLBuildSchemaOptions';

@Module({
  imports: [
    ConsoleModule,
    GraphQLModule.forRoot({
      playground: isDevEnv(),
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      // See: https://github.com/nestjs/graphql/issues/305
      buildSchemaOptions: { authChecker } as TypeGraphQLBuildSchemaOptions,
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
