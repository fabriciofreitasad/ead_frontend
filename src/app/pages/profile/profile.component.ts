import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioDTO } from '../../core/models/usuario.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // <- corrigido
})
export class ProfileComponent implements OnInit {
  loading = signal(true);
  user = signal<UsuarioDTO | null>(null);

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.me().subscribe({
      next: (u: UsuarioDTO) => { // tipagem explícita opcional
        this.user.set(u);
        this.loading.set(false);
      },
      error: () => { // <- sem parâmetro (ou use (_: unknown) => ...)
        this.loading.set(false);
      }
    });
  }
}
