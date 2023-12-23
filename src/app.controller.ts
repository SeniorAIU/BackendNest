import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Session,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  // @Get()
  // findAll(@Req() request: Request) {
  //   request.session.visits = request.session.visits
  //     ? request.session.visits + 1
  //     : 1;
  // }

  @Get('get-session')
  getSession(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: any,
  ) {
    const user = session.user;
    return user
      ? res.send(`User: ${user.username}`)
      : res.send('No user in session');
  }
}
