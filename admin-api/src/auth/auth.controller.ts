import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { UserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() data: UserDto) {
    const user = {
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
    };
    return await this.userService.create(user);
  }
}
