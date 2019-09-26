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
import { LoginRecordService } from './loginRecord.service';
import { LoginRecord } from 'modules/loginRecord/loginRecord.schema';
import { User } from 'modules/user/schemas/user.schema';

@Resolver(LoginRecord)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
export class LoginRecordResolver {
  private readonly logger = new BackendLogger(LoginRecordResolver.name);

  constructor(private readonly loginRecordService: LoginRecordService) {}

  @Query(() => [LoginRecord])
  async loginRecords(@Context('req') { user }: { user: User }) {
    return this.loginRecordService.findAllByUserId(user._id);
  }
}
