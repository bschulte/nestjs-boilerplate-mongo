import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';
import { InjectModel } from 'nestjs-typegoose';
import * as geoip from 'geoip-lite';

import {
  LoginRecord,
  LoginRecordModel,
} from 'modules/loginRecord/loginRecord.schema';
import { BackendLogger } from 'modules/logger/BackendLogger';

@Injectable()
export class LoginRecordService {
  private readonly logger = new BackendLogger(LoginRecordService.name);

  constructor(
    @InjectModel(LoginRecord)
    private readonly loginRecordModel: ModelType<LoginRecord>,
  ) {}

  async findAll(userId: string) {
    return await this.loginRecordModel.find({ userId });
  }

  async create(ip: string, userId: string): Promise<LoginRecord | null> {
    this.logger.log(`User ip for login: ${ip}`);

    const locationInfo = geoip.lookup(ip);
    if (!locationInfo) {
      this.logger.warn('Could not find location info for user IP');
      return null;
    }
    const { country, region, city } = locationInfo;
    const [lat, long] = locationInfo.ll;

    const newLoginRecord = new this.loginRecordModel({
      userId,
      country,
      region,
      city,
      lat,
      long,
      ip,
    });

    return await newLoginRecord.save();
  }
}
