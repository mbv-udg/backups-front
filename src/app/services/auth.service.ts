import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<Login> {
    let body = {
      "username": username,
      "password": password
    }
    return this.httpClient.post(this.server+'/login', body) as Observable<Login>;
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}
