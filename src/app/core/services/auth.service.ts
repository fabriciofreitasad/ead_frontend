// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { map } from 'rxjs';

export interface LoginResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${API_CONFIG.base}/usuario`;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    // backend devolve texto (token ou mensagem)
    return this.http.post(`${this.base}/login`, { email, senha }, { responseType: 'text' })
      .pipe(
        map((text: string) => {
          // se vier "Bearer xxx" ou só "xxx", normaliza:
          const raw = text?.trim() ?? '';
          const token = raw.toLowerCase().startsWith('bearer ') ? raw.substring(7) : raw;
          return { token } as LoginResponse;
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
