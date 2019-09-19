export const moduleTemplate = (
  name: string,
  className: string,
  filesToCreate: string[],
) => {
  return `
import { Module } from '@nestjs/common';
import { ${className}Service } from './${name}.service';
import { ${className}Controller } from './${name}.controller';
import { ${className}Resolver } from './${name}.resolver';
import { ${className}Schema } from './${name}.schema';
import { ${className}Console } from './${name}.console';
// import { AuthModule } from 'src/auth/auth.module';
// import { RoleModule } from 'src/role/role.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: '${className}', schema: ${className}Schema }]),
    // RoleModule,
  ],
  controllers: [${className}Controller],
  providers: [${className}Service, ${className}Resolver, ${className}Console],
  exports: [${className}Service, ${className}Console],
})
export class ${className}Module {}
  `;
};
