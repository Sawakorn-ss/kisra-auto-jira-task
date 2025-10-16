import { Body, Controller, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { AuthService } from './auth.service';

class ExchangeCodeDto {
  @IsString()
  code!: string;
}

@Controller('auth/jira')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('exchange')
  async exchange(@Body() body: ExchangeCodeDto) {
    return this.authService.exchangeCodeForToken(body.code);
  }
}
