import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { LoginUser } from '../interfaces/login-user.interface';
import { RegisterUser } from '../interfaces/register-user.interface';
import { ResponseTokenApi } from '../interfaces/response-token.interface';
import { ResponseUserLoggedInApi } from '../interfaces/response-user-loggedin.interface';
import { ResponseUserRegistered } from '../interfaces/response-user-registered.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private usernameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.getUsernameFromCookie());

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public register(user: RegisterUser): Observable<ResponseUserRegistered> {
    return this.http.post<ResponseUserRegistered>(
      `${this.url}/auth/register`,
      user
    );
  }

  public authenticate(user: LoginUser): Observable<ResponseTokenApi> {
    return this.http.post<ResponseTokenApi>(
      `${this.url}/auth/authenticate`,
      user
    );
  }

  public getUserLoggedIn(): Observable<ResponseUserLoggedInApi> {
    return this.http.get<ResponseUserLoggedInApi>(
      `${this.url}/auth/user-loggedin`
    );
  }

  public login(username: string) {
    this.loggedIn.next(true);
    this.usernameSubject.next(username);
  }

  public logout(): void {
    this.loggedIn.next(false);
    this.usernameSubject.unsubscribe();
    this.cookieService.deleteAll();
  }

  public isLoggedIn() {
    const token = this.cookieService.get('token');

    if (token === null || token === undefined || token === '') {
      return false;
    } else {
      return true;
    }
  }

  public setTokenInCookie(token: string): void {
    this.cookieService.set('token', token);
  }

  public setUsernameInCookie(username: string): void {
    this.cookieService.set('username', username);
  }

  get username$(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  public setUserRoleInCookie(userRole: string): void {
    this.cookieService.set('userRole', userRole);
  }

  public getUsernameFromCookie() {
    const username = this.cookieService.get('username');
    return username;
  }

  public getUserRoleFromCookie(): string {
    const userRole = this.cookieService.get('userRole');
    return userRole;
  }
}
