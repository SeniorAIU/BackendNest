/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { OrgService } from 'src/org/org.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private orgService: OrgService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOnes(email);
    const org = await this.orgService.findOneEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    } else if (org && org.password === pass) {
      const { password, ...result } = org;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
