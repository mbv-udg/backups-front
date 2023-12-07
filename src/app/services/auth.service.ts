import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    //fer la crida
    localStorage.setItem("token", "ergeromgerpog");
    return new Observable<boolean>(); //TODO:
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}
