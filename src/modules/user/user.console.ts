import { Command, Console } from 'nestjs-console';
import * as prompt from 'prompts';
import chalk from 'chalk';

import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';
import { randomStr } from 'common/util';

@Console({
  name: 'user',
  description: 'Commands to work with users',
})
export class UserConsole {
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

    console.log(`User is created, new id: ${chalk.green(user._id)}`);

    process.exit();
  }

  @Command({
    command: 'change-pass',
    description: 'Change a user password',
  })
  async changePass() {
    const users = await this.userService.findAll();

    const { id } = await prompt({
      type: 'autocomplete',
      name: 'id',
      message: 'Select user',
      choices: users.map(user => ({ title: user.email, value: user.id })),
    });

    const { newPass } = await prompt({
      type: 'text',
      name: 'newPass',
      message: 'New password',
    });

    const modifiedUser = await this.userService.changePass(id, newPass);
    console.log(
      `Changed password for user: ${chalk.green(modifiedUser.email)}`,
    );

    process.exit();
  }
}
