import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { userCredentials } from './userCredentials';
import { Observable } from 'rxjs';
import { RequestOptions, Request, Headers } from '@angular/http';
import { Account } from '../account';
import { loginResponse } from './LoginResponse';

const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type':  'application/json',
 }),
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  account: Account;
  private path: string;

  private baseUrl: string = "http://localhost:8000/"//AppConfig.backend.baseUrl;

  constructor(private httpClient: HttpClient) {
    this.path = 'auth/login';
  }

  login(userCred: userCredentials): Observable<HttpResponse<loginResponse>> {
    return this.httpClient
      .post<loginResponse>(this.baseUrl + 'api/auth/login'
                            , userCred, {observe : 'response'});
  }

  signup(userCred: userCredentials): Observable<HttpResponse<loginResponse>> {
    return this.httpClient
    .post<loginResponse>(this.baseUrl + 'signup'
                          , userCred, {observe : 'response'});
  }
}
