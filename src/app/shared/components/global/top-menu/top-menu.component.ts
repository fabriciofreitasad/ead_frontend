import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterStateService } from '../../../../core/router/router-state.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit, OnDestroy {
  appLogo = 'assets/logo-agendador-javanauta.png';

  rotaAtual = '';
  private inscricaoRota!: Subscription;

  private routerService = inject(RouterStateService);
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.inscricaoRota = this.routerService.rotaAtual$.subscribe((url) => {
      this.rotaAtual = url;
    });
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
  }

  isLogged(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register';
  }

  estaNaRotaLogin(): boolean {
    return this.rotaAtual === '/login';
  }
}
