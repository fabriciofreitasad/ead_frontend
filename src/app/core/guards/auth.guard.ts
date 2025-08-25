import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  // Se tem token, libera. Caso contrário, redireciona.
  return token ? true : router.parseUrl('/login');
};
