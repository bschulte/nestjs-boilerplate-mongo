import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ModelType } from 'typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { User, UserModel } from 'modules/user/schemas/user.schema';
import { BackendLogger } from 'modules/logger/BackendLogger';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new BackendLogger(UserService.name);

  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {}

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    // console.log(user);

    return user;
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async create(createUserDto: UserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async changePass(id: string, newPass: string) {
    const user = await this.findOneById(id);
    user.password = newPass;
    return await user.save();
  }

  async handleInvalidPassword(user) {
    user.loginAttempts = user.loginAttempts + 1;

    if (user.loginAttempts > 5) {
      this.logger.warn(
        `User entered invalid password too many times: ${user.email}`,
      );
      user.locked = true;
    }

    await user.save();
  }

  async handleSuccessfulLogin(user) {
    user.lastLogin = new Date(dayjs().toISOString());
    user.loginAttempts = 0;

    await user.save();
  }
}
