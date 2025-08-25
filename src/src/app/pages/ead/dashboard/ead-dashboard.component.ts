import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EadService } from '../../../core/services/ead.service';
import { CursoDTO } from '../../../core/models/ead.model';

@Component({
  selector: 'app-ead-dashboard',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './ead-dashboard.component.html',
  styleUrl: './ead-dashboard.component.scss'
})
export class EadDashboardComponent implements OnInit {
  meusCursos = signal<CursoDTO[]>([]);

  constructor(private ead: EadService, private router: Router) {}

  ngOnInit(): void {
    this.ead.getMyCourses().subscribe(cs => this.meusCursos.set(cs));
  }

  abrirCurso(c: CursoDTO) {
    this.router.navigate(['/ead/curso', c.id]);
  }
}
