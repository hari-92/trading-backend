import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('start googleAuth');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    const user = req.user;
    console.log('googleAuthRedirect success with user: ', user);
    return user;
  }
}
