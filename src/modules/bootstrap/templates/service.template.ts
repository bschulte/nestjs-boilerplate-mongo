export const serviceTemplate = (name: string, className: string) => {
  return `
import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { ${className}, ${className}Model } from 'modules/${name}/${name}.schema';
import { BackendLogger } from 'modules/logger/BackendLogger';
import { ${className}Dto } from './${name}.dto';

@Injectable()
export class ${className}Service {
  private readonly logger = new BackendLogger(${className}Service.name);

  constructor(@InjectModel(${className}) private readonly ${name}Model: ModelType<${className}>) {}

  async findOneById(id: string) {
    return await this.${name}Model.findById(id);
  }

  async findAll() {
    return await this.${name}Model.find();
  }

  async create(create${className}Dto: ${className}Dto): Promise<${className}> {
    const new${className} = new this.${name}Model(create${className}Dto);
    return await new${className}.save();
  }
}
`;
};
