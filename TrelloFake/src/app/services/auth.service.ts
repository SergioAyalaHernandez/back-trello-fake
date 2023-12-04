import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {switchMap, tap} from "rxjs";
import {TokenService} from "@services/token.service";
import {ResponseLogin} from "@models/auth.model";
import {User} from "@models/user.model";
import {checkToken} from "@interceptors/token.interceptor";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  user$: any;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  login(userId: string, clientSecret: string) {
    return this.http.post<ResponseLogin>(this.apiUrl + "/auth/Authenticate", {
      userId,
      clientSecret
    }).pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(this.apiUrl + "/api/v1/auth/register", {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(this.apiUrl + "/api/v1/auth/is-available", {
      email
    });
  }

  recovery(email: string) {
    return this.http.post(this.apiUrl + "/api/v1/auth/recovery", {
      email
    });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(this.apiUrl + "/api/v1/auth/recovery", {
      token,
      newPassword
    });
  }

  getProfile() {
    const token = this.tokenService.getToken();
    return this.http.get<User>(this.apiUrl + "/api/v1/auth/profile", {
      context: checkToken()
    })
  }

  logout() {
    this.tokenService.removeToken();
  }

  refreshToken(refreshToken: string) {
    return this.http.post<ResponseLogin>(this.apiUrl + "/api/v1/auth/refresh-token", {refreshToken})
      .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }
}
