import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const ROLE_KEY = 'AuthRole';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut() {
    localStorage.clear();
  }
  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveEmail(email: string) {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.setItem(EMAIL_KEY, email);
  }
  public getEmail(): string {
    return localStorage.getItem(EMAIL_KEY);
  }
  public saveRole(role: string) {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, role);
  }
  public getRole(): string {
    return localStorage.getItem(ROLE_KEY);
  }
}
