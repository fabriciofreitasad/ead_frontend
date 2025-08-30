import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ead-course',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './ead-course.component.html',
  styleUrl: './ead-course.component.scss'
})
export class EadCourseComponent {
  aulas: string[] = [
    'Introdução ao Rastreamento',
    'Configuração do Equipamento',
    'Uso do Aplicativo Mobile',
    'Relatórios de Frota',
    'Alertas e Segurança'
  ];
}
