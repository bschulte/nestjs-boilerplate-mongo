export const consoleTemplate = (name: string, className: string) => {
  return `
import { Command, Console } from 'nestjs-console';
import * as prompt from 'prompts';
import chalk from 'chalk';

import { Inject, Injectable } from '@nestjs/common';
import { ${className}Service } from 'modules/${name}/${name}.service';
import { randomStr } from 'common/util';

@Console({
  name: '${name}',
  description: 'Commands to work with ${name}s',
})
export class ${className}Console {
  constructor(private readonly ${name}Service: ${className}Service) {}

  @Command({
    command: 'doSomething',
    description: 'Do something',
  })
  async create${className}() {

    // Do something here

    process.exit();
  }
}
`;
};
