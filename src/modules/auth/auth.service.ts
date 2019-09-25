import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { JwtPayload } from './interfaces/jwtPayload.interface';
import { BackendLogger } from 'modules/logger/BackendLogger';
import { UserService } from 'modules/user/user.service';
import { User } from 'modules/user/schemas/user.schema';
import { TOKEN_EXPIRES_IN } from 'common/constants';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string) {
    this.logger.log(`Logging user in: ${email}`);
    const user = await this.userService.findOneByEmail(email);

    // Email was invalid
    if (!user) {
      this.logger.warn(`User not found: ${email}`);
      throw new HttpException(
        'Invalid email/password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Account is locked
    if (user.locked) {
      this.logger.warn(`User attempted to login to locked account: ${email}`);
      throw new HttpException('Account locked', HttpStatus.UNAUTHORIZED);
    }

    // Check password
    if (!this.validatePassword(user, password)) {
      await this.userService.handleInvalidPassword(user);
      throw new HttpException(
        'Invalid email/password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.userService.handleSuccessfulLogin(user);

    return this.createToken(user);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  validatePassword(user: User, password: string): boolean {
    return bcrypt.compareSync(password, user.password);
  }

  async createToken(user: User) {
    const accessToken = this.jwtService.sign({
      email: user.email,
    });

    return {
      expiresIn: TOKEN_EXPIRES_IN,
      accessToken,
    };
  }
}
