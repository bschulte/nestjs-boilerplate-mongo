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
// import { LoginRecordService } from 'src/loginRecord/loginRecord.service';
import { Roles } from 'modules/role/decorators/roles.decorator';
import { roles } from 'common/constants';
// import { RoleService } from 'src/role/role.service';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'modules/user/schemas/user.schema';
// import { NotificationStatusService } from 'src/notificationStatus/notificationStatus.service';

@Resolver(User)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
export class UserResolver {
  private readonly logger = new BackendLogger(UserResolver.name);

  // private readonly roleService: RoleService,
  // private readonly loginRecordService: LoginRecordService,
  // private readonly notificationStatusService: NotificationStatusService,
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Context('req') { user }) {
    this.logger.debug(`Getting user info: ${user.email}`);
    return this.userService.findOneByEmail(user.email);
  }

  @Mutation(() => User)
  @Roles(roles.ADMIN)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.create({ email, password });
  }

  @Mutation(() => User)
  @Roles(roles.ADMIN)
  async addRole(@Args('userId') userId: string, @Args('role') role: string) {
    return this.userService.addRole(userId, role);
  }

  @Mutation(() => User)
  @Roles(roles.ADMIN)
  async disabledRole(
    @Args('userId') userId: string,
    @Args('role') role: string,
  ) {
    return this.userService.disableRole(userId, role);
  }
}
