import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BackendLogger } from 'modules/logger/BackendLogger';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new BackendLogger(GqlAuthGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const args = ctx.getArgs();

    this.logger.debug(
      `GraphQL ${info.operation.operation}, Field: ${
        info.fieldName
      }, Args: ${JSON.stringify(args)}`,
    );

    return ctx.getContext().req;
  }
}
