import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { Command, Positional, Option } from 'nestjs-command';
import { BackendLogger } from 'src/logger/BackendLogger';

import { randomStr } from 'src/common/utils';

@Injectable()
export class UserCommand {
  private readonly logger = new BackendLogger(UserCommand.name);

  constructor(private readonly userService: UserService) {}

  @Command({ command: 'user:create [email]', describe: 'create a new user' })
  async create(
    @Positional({
      name: 'email',
      describe: 'new user email',
      type: 'string'
    })
    email: string
  ) {
    this.logger.log(`Creating new user: ${email}`);
    const password = randomStr(16);

    await this.userService.create({ email, password });
    this.logger.log(`Created, generated password: ${password}`);
  }

  @Command({
    command: 'user:change-pass [-e | --email] [-p | --password]',
    describe: 'change the user password'
  })
  async changePass(
    @Option({ name: 'email', alias: 'e', demandOption: true }) email: string,
    @Option({ name: 'password', alias: 'p', demandOption: true })
    newPass: string
  ) {
    this.logger.log(`Changing ${email}'s password, to password: ${newPass}`);

    const user = await this.userService.findOneByEmail(email);
    user.password = bcrypt.hashSync(newPass, 10);
    await this.userService.save(user);

    this.logger.log('Complete');
  }
}
