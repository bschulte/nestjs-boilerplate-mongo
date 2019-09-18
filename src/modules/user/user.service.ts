import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { UserDto } from './dtos/user.dto';
import { BackendLogger } from 'src/modules/logger/BackendLogger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/modules/user/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new BackendLogger(UserService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async create(createUserDto: UserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async handleInvalidPassword(user: IUser) {
    user.loginAttempts = user.loginAttempts + 1;

    if (user.loginAttempts > 5) {
      this.logger.warn(
        `User entered invalid password too many times: ${user.email}`,
      );
      user.locked = true;
    }

    await user.save();
  }

  async handleSuccessfulLogin(user: IUser) {
    user.lastLogin = new Date(dayjs().toISOString());
    user.loginAttempts = 0;

    await user.save();
  }
}
