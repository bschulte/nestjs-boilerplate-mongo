import { Command, Console } from 'nestjs-console';
import * as prompt from 'prompts';
import chalk from 'chalk';

import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';
import { BackendLogger } from 'modules/logger/BackendLogger';
import { randomStr } from 'common/util';

@Console({
  name: 'user',
  description: 'Commands to work with users',
})
export class UserConsole {
  private readonly logger = new BackendLogger(UserConsole.name);

  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create',
    description: 'Create a user',
  })
  async createUser() {
    const { email } = await prompt({
      type: 'text',
      name: 'email',
      message: 'Email for the user',
    });

    const password = randomStr(24);
    console.log(`Generated password: ${chalk.red(password)}`);

    const user = await this.userService.create({ email, password });

    console.log(`User is created, new id: ${chalk.green(user.id)}`);

    process.exit();
  }
}
