// src/app/core/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO, EnderecoDTO, TelefoneDTO } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private base = `${API_CONFIG.base}/usuario`;  // 👈 use só "base"

  constructor(private http: HttpClient) {}

  me(): Observable<UsuarioDTO> {
    const email = localStorage.getItem('email');
    if (!email) {
      return throwError(() => new Error('Email não encontrado no storage. Faça login novamente.'));
    }
    const params = new HttpParams().set('email', email);
    return this.http.get<UsuarioDTO>(this.base, { params });
  }

  criar(body: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.base, body);
  }

  buscarPorEmail(email: string): Observable<UsuarioDTO> {
    const params = new HttpParams().set('email', email);
    return this.http.get<UsuarioDTO>(this.base, { params }); // GET /usuario?email=...
  }

  deletarPorEmail(email: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(email)}`);
  }

  atualizarUsuario(body: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(this.base, body);
  }

  atualizarEndereco(id: number, body: EnderecoDTO): Observable<EnderecoDTO> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put<EnderecoDTO>(`${this.base}/endereco`, body, { params });
  }

  atualizarTelefone(id: number, body: TelefoneDTO): Observable<TelefoneDTO> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put<TelefoneDTO>(`${this.base}/telefone`, body, { params });
  }

  cadastrarEndereco(body: EnderecoDTO): Observable<EnderecoDTO> {
    return this.http.post<EnderecoDTO>(`${this.base}/endereco`, body);
  }

  cadastrarTelefone(body: TelefoneDTO): Observable<TelefoneDTO> {
    return this.http.post<TelefoneDTO>(`${this.base}/telefone`, body);
  }

  buscarEnderecoPorCep(cep: string) {
    return this.http.get<any>(`${this.base}/endereco/${cep}`);
  }
}
