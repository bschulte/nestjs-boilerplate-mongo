import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dtos/createRole.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from 'modules/role/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<IRole>) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = new this.roleModel(createRoleDto);
    return await newRole.save();
  }

  async findAll(options: Partial<IRole>) {
    return await this.roleModel.find(options);
  }
}
