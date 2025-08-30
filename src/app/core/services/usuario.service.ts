import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO, EnderecoDTO, TelefoneDTO } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private base = `${API_CONFIG.base}/usuario`;

  constructor(private http: HttpClient) {}

  /** Helper pra Authorization */
  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token'); // ajuste se o AuthService usa outra key
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  me(): Observable<UsuarioDTO> {
    const email = localStorage.getItem('email');
    if (!email) return throwError(() => new Error('Email não encontrado. Faça login.'));
    const params = new HttpParams().set('email', email);
    return this.http.get<UsuarioDTO>(this.base, { params });
  }

  criar(body: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.base, body);
  }

  buscarPorEmail(email: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(this.base, { params: { email } });
  }

  deletarPorEmail(email: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(email)}`);
  }

  /** PUT /usuario -> requer Authorization (token) */
  atualizarUsuario(body: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(this.base, body, this.authHeaders());
  }

  /** PUT /usuario/endereco?id=... */
  atualizarEndereco(id: number, body: EnderecoDTO): Observable<EnderecoDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<EnderecoDTO>(`${this.base}/endereco`, body, { params });
  }

  /** PUT /usuario/telefone?id=... */
  atualizarTelefone(id: number, body: TelefoneDTO): Observable<TelefoneDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<TelefoneDTO>(`${this.base}/telefone`, body, { params });
  }

  /** POST /usuario/endereco -> requer Authorization (token) */
  cadastrarEndereco(body: EnderecoDTO): Observable<EnderecoDTO> {
    return this.http.post<EnderecoDTO>(`${this.base}/endereco`, body, this.authHeaders());
  }

  /** POST /usuario/telefone -> requer Authorization (token) */
  cadastrarTelefone(body: TelefoneDTO): Observable<TelefoneDTO> {
    return this.http.post<TelefoneDTO>(`${this.base}/telefone`, body, this.authHeaders());
  }

  buscarEnderecoPorCep(cep: string) {
    return this.http.get<any>(`${this.base}/endereco/${cep}`);
  }
}
