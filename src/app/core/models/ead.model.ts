export interface AulaDTO {
  id: number;
  titulo: string;
  descricao?: string;
  duracaoMin?: number;
  videoUrl?: string;
  ordem?: number;
}

export interface CursoDTO {
  id: number;
  titulo: string;
  descricao: string;
  cargaHoraria?: number;
  thumbnailUrl?: string;
  aulas?: AulaDTO[];
  progresso?: number; // 0-100
  matriculado?: boolean;
}
