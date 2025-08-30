import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

type MyCourse = {
  id: number;
  titulo: string;
  descricao: string;
  progresso: number;   // 0..100
  thumb?: string;
};

@Component({
  selector: 'app-ead-my-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './ead-my-courses.component.html',
  styleUrl: './ead-my-courses.component.scss'
})
export class EadMyCoursesComponent {
  // 👉 cursos de exemplo (mock)
  meusCursos: MyCourse[] = [
    {
      id: 1,
      titulo: 'Rastreamento Veicular — TargetCar',
      descricao: 'Do zero à operação: instalação, app, relatórios e alertas.',
      progresso: 20,
      thumb: 'assets/course-thumb-rastreamento.jpg' // opcional
    },
    {
      id: 2,
      titulo: 'Relatórios de Frota',
      descricao: 'KPIs, filtros e exportação para gestão eficiente.',
      progresso: 0
    }
  ];
}
