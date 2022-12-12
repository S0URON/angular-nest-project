import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/auth/user-types/user.types';
import { Observable } from 'rxjs';

export interface loginResult {
  access_token: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host = 'http://localhost:8080/auth';
  constructor(private httpClient: HttpClient) {}

  login(body: { email: string; password: string }): Observable<loginResult> {
    return this.httpClient.post<loginResult>(this.host + '/login', body);
  }

  signUp(body: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }): Observable<any> {
    return this.httpClient.post(this.host + '/signup', body);
  }
}
