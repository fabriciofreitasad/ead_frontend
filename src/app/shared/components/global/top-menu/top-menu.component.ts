import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { SidenavService } from '../../../../core/services/sidenav.service'; // ✅ novo

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private sidenav = inject(SidenavService);

  url = '';
  sub!: Subscription;

  ngOnInit(): void {
    this.url = this.router.url;
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => (this.url = e.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isLogged(): boolean {
    return this.auth.isAuthenticated();
  }

  onMenuClick(): void {
    this.sidenav.triggerToggle(); // ✅ dispara toggle do drawer
  }

  logout(): void {
    this.auth.logout(); // precisa existir no AuthService (clear token + navigate /login)
  }

  // helpers de rota p/ esconder botões
  isAuthRoute(): boolean {
    return this.url === '/login' || this.url === '/register';
  }

  isEadRoute(): boolean {
    return this.url.startsWith('/ead');
  }
}
