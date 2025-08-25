# Integração Angular + Spring Boot (CORS no backend)
## Passos
1. Garanta no Spring Boot um CorsFilter liberando http://localhost:4200 e métodos/headers.
2. Use o endpoint POST /auth/login para obter o JWT e armazene-o no localStorage.
3. O interceptor anexa automaticamente o token em todas as requisições.
4. O guard protege rotas internas (adicione onde precisar).
5. Configure a URL do backend em `src/app/core/config/api.config.ts`.

## Onde mexer
- `src/app/core/config/api.config.ts`: base URL do backend.
- `src/app/core/services/*`: serviços de Auth e Usuário.
- `src/app/core/interceptors/auth.interceptor.ts`: anexa Authorization.
- `src/app/core/guards/auth.guard.ts`: protege rotas.
- `src/app/app.config.ts`: já ajustado com `withInterceptors`.
