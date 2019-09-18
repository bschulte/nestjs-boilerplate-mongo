import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { BackendLogger } from 'src/modules/logger/BackendLogger';
import { LoginDto } from './interfaces/login.dto';
import { AuthService } from './auth.service';
// import { LoginRecordService } from 'src/loginRecord/loginRecord.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new BackendLogger(AuthController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // private readonly loginRecordService: LoginRecordService,
  ) {}

  @Post('login')
  async login(@Req() req, @Body() { email, password }: LoginDto) {
    const token = await this.authService.login(email, password);

    // We'll only get to this point if the login is successful, so we
    // can create a login record now
    const user = await this.userService.findOneByEmail(email);
    // await this.loginRecordService.create(req.ip, user.id);

    return token;
  }
}
