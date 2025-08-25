import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EnderecoPayload {
  rua: string;
  numero: number;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface TelefonePayload {
  numero: string;
  ddd: string;
}

export interface UserRegisterPayload {
  nome: string;
  email: string;
  senha: string;
  enderecos: EnderecoPayload[];
  telefones: TelefonePayload[];
}

export interface UserRegisterResponse {
  id?: number;
  nome: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = 'http://localhost:8083/usuario';

  constructor(private http: HttpClient) {}

  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}`, body);
  }
}
