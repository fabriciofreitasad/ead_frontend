import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EadService } from '../../../core/services/ead.service';
import { CursoDTO } from '../../../core/models/ead.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ead-catalog',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './ead-catalog.component.html',
  styleUrl: './ead-catalog.component.scss'
})
export class EadCatalogComponent implements OnInit {
  catalogo = signal<CursoDTO[]>([]);

  constructor(private ead: EadService, private router: Router) {}

  ngOnInit(): void {
    this.ead.getCatalog().subscribe(cs => this.catalogo.set(cs));
  }

  entrar(c: CursoDTO) {
    if (c.matriculado) {
      this.router.navigate(['/ead/curso', c.id]);
    } else {
      this.ead.enroll(c.id).subscribe(() => this.router.navigate(['/ead/curso', c.id]));
    }
  }
}
