import { BuildSchemaOptions } from '@nestjs/graphql/dist/external/type-graphql.types';
import { AuthChecker } from 'type-graphql';

export interface TypeGraphQLBuildSchemaOptions extends BuildSchemaOptions {
  authChecker: AuthChecker<any, any>;
}
