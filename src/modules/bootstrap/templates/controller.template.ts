export const controllerTemplate = (name: string, className: string) => {
  return `
import {
  Controller,
  Param,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';

import { BackendLogger } from 'modules/logger/BackendLogger';
import { ${className}Dto } from './${name}.dto';
import { ${className}Service } from './${name}.service';
import { RolesGuard } from 'modules/role/guards/roles.guard';
import { roles } from 'common/constants';
import { Roles } from 'modules/role/decorators/roles.decorator';
import { JwtAuthGuard } from 'modules/auth/guards/jwtAuth.guard';

@Controller('${name}')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ${className}Controller {
  private readonly logger = new BackendLogger(${className}Controller.name);

  constructor(private readonly ${name}Service: ${className}Service) {}

  @Get()
  async findOne(@Param() { id }) {
    return this.${name}Service.findOneById(id);
  }

  @Post()
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create${className}(@Body(new ValidationPipe()) create${className}Dto: ${className}Dto) {
    this.logger.log(\`Creating new ${name}\`);
    return await this.${name}Service.create(create${className}Dto);
  }
}
`;
};
