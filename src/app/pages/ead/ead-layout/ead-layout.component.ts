import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-ead-layout',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
  ],
  templateUrl: './ead-layout.component.html',
  styleUrl: './ead-layout.component.scss'
})
export class EadLayoutComponent {
  opened = signal(true);
  private auth = inject(AuthService);

  toggle(): void {
    this.opened.update(v => !v);
  }

  isLogged(): boolean {
    return this.auth.isAuthenticated();
  }
}
