import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { EadService } from '../../../core/services/ead.service';
import { CursoDTO } from '../../../core/models/ead.model';

@Component({
  selector: 'app-ead-course',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './ead-course.component.html',
  styleUrl: './ead-course.component.scss'
})
export class EadCourseComponent implements OnInit {
  curso = signal<CursoDTO | null>(null);

  constructor(private route: ActivatedRoute, private router: Router, private ead: EadService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ead.getCourseById(id).subscribe(c => this.curso.set(c));
  }

  abrirAula(aulaId: number) {
    const id = this.curso()?.id;
    if (id) this.router.navigate(['/ead/curso', id, 'aula', aulaId]);
  }
}
