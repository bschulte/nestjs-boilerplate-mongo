import { BootstrapConsole } from 'nestjs-console';
import * as readline from 'readline';

import { AppModule } from './app.module';

BootstrapConsole.init({ module: AppModule })
  .then(({ app, boot }) => {
    boot(process.argv);
  })
  .catch(e => console.log('Error', e));
