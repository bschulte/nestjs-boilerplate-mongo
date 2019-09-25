export const resolverTemplate = (name: string, className: string) => {
  return `
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { BackendLogger } from 'modules/logger/BackendLogger';
import { GqlAuthGuard } from 'modules/auth/guards/graphqlAuth.guard';
import { GqlRolesGuard } from 'modules/role/guards/graphqlRoles.guard';
import { Roles } from 'modules/role/decorators/roles.decorator';
import { roles } from 'common/constants';
import { UseGuards } from '@nestjs/common';
import { ${className}Service } from './${name}.service';
import { ${className} } from 'modules/${name}/${name}.schema';

@Resolver(${className})
@UseGuards(GqlAuthGuard, GqlRolesGuard)
export class ${className}Resolver {
  private readonly logger = new BackendLogger(${className}Resolver.name);

  constructor(private readonly ${name}Service: ${className}Service) {}

  @Query(() => ${className})
  async ${name}(@Args('id') id: string) {
    return this.${name}Service.findOneById(id);
  }

  @Mutation(() => ${className})
  @Roles(roles.ADMIN)
  async create${className}(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.${name}Service.create({ email, password });
  }
}

`;
};
