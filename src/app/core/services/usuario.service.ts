import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO, EnderecoDTO, TelefoneDTO } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private base = `${API_CONFIG.base}/usuario`;

  constructor(private http: HttpClient) {}

  /** Busca o usuário logado (usando o email salvo no login) */
  me(): Observable<UsuarioDTO> {
    const email = localStorage.getItem('email');
    if (!email) {
      return throwError(() => new Error('Email não encontrado no storage. Faça login novamente.'));
    }
    const params = new HttpParams().set('email', email);
    return this.http.get<UsuarioDTO>(this.base, { params });
  }

  /** CRUD de usuário */
  criar(body: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.base, body);
  }

  buscarPorEmail(email: string): Observable<UsuarioDTO> {
    const params = new HttpParams().set('email', email);
    return this.http.get<UsuarioDTO>(this.base, { params });
  }

  deletarPorEmail(email: string): Observable<void> {
    // Backend: DELETE /usuario/{email}
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(email)}`);
  }

  atualizarUsuario(body: UsuarioDTO): Observable<UsuarioDTO> {
    // Backend: PUT /usuario (Authorization header requerido)
    return this.http.put<UsuarioDTO>(this.base, body);
  }

  /** Endereços */
  atualizarEndereco(id: number, body: EnderecoDTO): Observable<EnderecoDTO> {
    // Backend: PUT /usuario/endereco?id={id}
    const params = new HttpParams().set('id', String(id));
    return this.http.put<EnderecoDTO>(`${this.base}/endereco`, body, { params });
  }

  cadastrarEndereco(body: EnderecoDTO): Observable<EnderecoDTO> {
    // Backend: POST /usuario/endereco (Authorization header requerido)
    return this.http.post<EnderecoDTO>(`${this.base}/endereco`, body);
  }

  /** Telefones */
  atualizarTelefone(id: number, body: TelefoneDTO): Observable<TelefoneDTO> {
    // Backend: PUT /usuario/telefone?id={id}
    const params = new HttpParams().set('id', String(id));
    return this.http.put<TelefoneDTO>(`${this.base}/telefone`, body, { params });
  }

  cadastrarTelefone(body: TelefoneDTO): Observable<TelefoneDTO> {
    // Backend: POST /usuario/telefone (Authorization header requerido)
    return this.http.post<TelefoneDTO>(`${this.base}/telefone`, body);
  }

  /** ViaCEP proxy no backend */
  buscarEnderecoPorCep(cep: string): Observable<any> {
    return this.http.get<any>(`${this.base}/endereco/${encodeURIComponent(cep)}`);
  }
}
