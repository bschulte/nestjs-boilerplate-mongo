import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { BackendLogger } from 'src/modules/logger/BackendLogger';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
// import { RolesGuard } from 'src/role/guards/roles.guard';
import { roles } from 'src/common/constants';
// import { Roles } from 'src/role/decorators/roles.decorator';
// import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Controller('user')
// @UseGuards(AuthGuard, RolesGuard)
export class UserController {
  private readonly logger = new BackendLogger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  // @Roles(roles.ADMIN)
  // @UseGuards(JwtAuthGuard)
  async createUser(@Body(new ValidationPipe()) createUserDto: UserDto) {
    this.logger.log(`Creating new user: ${createUserDto.email}`);
    return await this.userService.create(createUserDto);
  }
}
