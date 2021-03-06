import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/Auth.model';
import { InitResetPasswordRequest } from '../_requests/init_reset_password.request';
import { LoginRequest } from '../_requests/login.request';
import { ResetPasswordRequest } from '../_requests/reset_password.request';
import { SignUpRequest } from '../_requests/signup.request';
import { LoginResponse } from '../_responses/login.response';
import { SignUpResponse } from '../_responses/signup.response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  auth: Auth = JSON.parse(localStorage.getItem('auth'));

  USER$: BehaviorSubject<Auth> = new BehaviorSubject(this.auth);

  constructor(private httpClient: HttpClient) {}

  signUp(req: SignUpRequest) {
    return this.httpClient.post<SignUpResponse>(environment.apiUrl + "/signup", req).pipe(map(res => {
    }));
  }

  verifyEmail(token: string) {
    return this.httpClient.get<void>(environment.apiUrl + `/verify-email/${token}`)
  }

  login(req: LoginRequest) {
    return this.httpClient.post<LoginResponse>(environment.apiUrl + "/login", req).pipe(
      map(res => {
        const auth: Auth = {
          userId: res.userId,
          username: res.username,
          token: res.token,
          role: res.role
        }

        localStorage.setItem('auth', JSON.stringify(auth));
        this.USER$.next(auth);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth');
    this.USER$.next(null);
  }

  requestResetPassword(req: InitResetPasswordRequest) {
    return this.httpClient.post(environment.apiUrl + "/request-reset-password", req);
  }

  resetPassword(req: ResetPasswordRequest) {
    return this.httpClient.post(environment.apiUrl + "/reset-password", req);
  }

  validateJwt(token: string, username: string) {
    return this.httpClient.get<boolean>(environment.apiUrl + `/validate-jwt/${token}/${username}`);
  }

  isLoggedIn() {
    return this.USER$.value
  }

}
