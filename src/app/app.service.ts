// app.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class OktaAuthService {

  oktaAuth = new OktaAuth({
    url: 'https://dev-256664.okta.com',
    clientId: '{clientId}',
    issuer: 'https://dev-256664.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/callback',
    headers:{
        'Access-Control-Allow-Origin': '*',
    }
  });

  constructor(private router: Router) {}

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
    alert('login call');
  }

  async handleAuthentication() {
    const tokens = await this.oktaAuth.token.parseFromUrl();
    tokens.forEach(token => {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    });
  }

  async logout() {
    alert('logout');
    console.log(JSON.stringify(this.oktaAuth));
    this.oktaAuth.tokenManager.clear();

    await this.oktaAuth.signOut();
  }
}
