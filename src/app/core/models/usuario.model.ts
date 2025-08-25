// src/app/core/models/usuario.model.ts
export interface EnderecoDTO {
  id?: number;
  rua: string;
  numero: number;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface TelefoneDTO {
  id?: number;
  numero: string;
  ddd: string;
}

export interface UsuarioDTO {
  id?: number;
  nome: string;
  email: string;
  // Senha opcional no model para reuso; no cadastro o form exige.
  senha?: string;
  enderecos: EnderecoDTO[];
  telefones: TelefoneDTO[];
}
