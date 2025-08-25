// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly base = `${API_CONFIG.base}/usuario`; // seu backend usa /usuario/login

  constructor(private http: HttpClient) {}

  // --- Auth API ---
  login(email: string, senha: string): Observable<LoginResponse> {
    // Controller do backend: POST /usuario/login (não é /auth/login)
    return this.http.post<LoginResponse>(`${this.base}/login`, { email, senha });
  }

  // --- Token storage ---
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // se você guarda o email para /profile ou buscas, pode limpar também:
    localStorage.removeItem('email');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
