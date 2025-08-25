import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CursoDTO, AulaDTO } from '../models/ead.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class EadService {
  private base = `${API_CONFIG.base}/ead`;

  // 👉 Coloque MOCK_MODE=false quando o backend estiver pronto
  private readonly MOCK_MODE = true;

  constructor(private http: HttpClient) {}

  getCatalog(): Observable<CursoDTO[]> {
    if (this.MOCK_MODE) {
      return of([
        { id: 1, titulo: 'Rastreamento: Introdução', descricao: 'Conceitos de rastreamento veicular', cargaHoraria: 4, progresso: 0, thumbnailUrl: '', matriculado: true },
        { id: 2, titulo: 'Operação TargetCar', descricao: 'Painel, alertas e relatórios', cargaHoraria: 6, progresso: 0, thumbnailUrl: '', matriculado: false },
      ]);
    }
    return this.http.get<CursoDTO[]>(`${this.base}/cursos`);
  }

  getMyCourses(): Observable<CursoDTO[]> {
    if (this.MOCK_MODE) {
      return of([
        { id: 1, titulo: 'Rastreamento: Introdução', descricao: 'Conceitos de rastreamento veicular', cargaHoraria: 4, progresso: 25, thumbnailUrl: '', matriculado: true },
      ]);
    }
    return this.http.get<CursoDTO[]>(`${this.base}/meus-cursos`);
  }

  getCourseById(id: number): Observable<CursoDTO> {
    if (this.MOCK_MODE) {
      const curso: CursoDTO = {
        id, titulo: 'Rastreamento: Introdução', descricao: 'Conceitos e arquitetura TargetCar', cargaHoraria: 4,
        aulas: [
          { id: 101, titulo: 'Apresentação', ordem: 1, duracaoMin: 5, videoUrl: 'https://example.com/video1.mp4' },
          { id: 102, titulo: 'Hardware e Instalação', ordem: 2, duracaoMin: 18, videoUrl: 'https://example.com/video2.mp4' },
          { id: 103, titulo: 'Plataforma e Painel', ordem: 3, duracaoMin: 22, videoUrl: 'https://example.com/video3.mp4' },
        ],
        progresso: 25,
        matriculado: true
      };
      return of(curso);
    }
    return this.http.get<CursoDTO>(`${this.base}/curso/${id}`);
  }

  getLesson(courseId: number, aulaId: number): Observable<AulaDTO> {
    if (this.MOCK_MODE) {
      return of({ id: aulaId, titulo: 'Aula Demo', duracaoMin: 10, videoUrl: 'https://example.com/video-demo.mp4' });
    }
    return this.http.get<AulaDTO>(`${this.base}/curso/${courseId}/aula/${aulaId}`);
  }

  enroll(courseId: number) {
    if (this.MOCK_MODE) {
      return of({ ok: true });
    }
    return this.http.post(`${this.base}/curso/${courseId}/matricular`, {});
  }
}
