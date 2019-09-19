import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleSchema } from './role.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
