import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { EadService } from '../../../core/services/ead.service';
import { Router } from '@angular/router';
import { CursoDTO } from '../../../core/models/ead.model';

@Component({
  selector: 'app-ead-my-courses',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './ead-my-courses.component.html',
  styleUrl: './ead-my-courses.component.scss'
})
export class EadMyCoursesComponent implements OnInit {
  meus = signal<CursoDTO[]>([]);

  constructor(private ead: EadService, private router: Router) {}

  ngOnInit(): void {
    this.ead.getMyCourses().subscribe(cs => this.meus.set(cs));
  }

  abrir(id: number) {
    this.router.navigate(['/ead/curso', id]);
  }
}
