import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Obter o token do LocalStorage
    const token = localStorage.getItem('access_token');

    if (token) {
      // Se o token existir, clone a solicitação e substitua o cabeçalho de autorização
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      // Envie a solicitação clonada em vez da original
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
