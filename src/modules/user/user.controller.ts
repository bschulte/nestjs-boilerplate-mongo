import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';

import { BackendLogger } from 'modules/logger/BackendLogger';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { RolesGuard } from 'modules/role/guards/roles.guard';
import { roles } from 'common/constants';
import { Roles } from 'modules/role/decorators/roles.decorator';
import { JwtAuthGuard } from 'modules/auth/guards/jwtAuth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  private readonly logger = new BackendLogger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    this.logger.log(`Creating new user: ${createUserDto.email}`);
    return await this.userService.create(createUserDto);
  }
}
