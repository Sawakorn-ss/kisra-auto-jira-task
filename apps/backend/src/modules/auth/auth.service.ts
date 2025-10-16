import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly http: HttpService, private readonly config: ConfigService) {}

  async exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
    const clientId = this.config.get<string>('jira.clientId');
    const clientSecret = this.config.get<string>('jira.clientSecret');
    const redirectUri = this.config.get<string>('jira.redirectUri');

    const form = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: clientId ?? '',
      client_secret: clientSecret ?? '',
      redirect_uri: redirectUri ?? ''
    });

    const response$ = this.http.post<OAuthTokenResponse>('https://auth.atlassian.com/oauth/token', form.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    this.logger.log('Exchanging authorization code for access token');
    const { data } = await firstValueFrom(response$);
    return data;
  }
}
