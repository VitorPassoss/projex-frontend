import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    // Verifique aqui se o token é válido na sua lógica de validação
    if (token) {
      // Por exemplo, você pode verificar se o token expirou ou se é válido de acordo com sua lógica específica
      // Se o token for válido, permita o acesso
      return true;
    }

    // Se o token não for válido, redirecione para a página de login ou qualquer outra rota adequada
    this.router.navigate(['/login']);
    return false;
  }
}
