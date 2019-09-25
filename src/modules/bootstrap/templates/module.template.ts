export const moduleTemplate = (
  name: string,
  className: string,
  filesToCreate: string[],
) => {
  return `
  import { Module } from '@nestjs/common';
  import { TypegooseModule } from 'nestjs-typegoose';
  import { ${className}Service } from './${name}.service';
  import { ${className}Controller } from './${name}.controller';
  import { ${className}Resolver } from './${name}.resolver';
  import { ${className} } from './${name}.schema';
  import { ${className}Console } from './${name}.console';

  @Module({
    imports: [
      TypegooseModule.forFeature([${className}]),
    ],
    controllers: [${className}Controller],
    providers: [${className}Service, ${className}Resolver, ${className}Console],
    exports: [${className}Service, ${className}Console],
  })
  export class ${className}Module {}

  `;
};
