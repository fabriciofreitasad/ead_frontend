import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// (Opcional) Se você já tiver um interceptor de Auth, importe aqui:
// import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      // Se não tiver interceptor, deixe só provideHttpClient()
      // withInterceptors([authInterceptor])
    )
  ]
};
