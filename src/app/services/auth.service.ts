import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userUpdated = new EventEmitter<void>(); // Emitirá eventos quando o usuário for atualizado

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  async register(username: string, password: string) {
    const url = environment.apiUrl + '/v1/auth/register/';
    try {
      const response: any = await this.httpClient.post(url, { username, password }).toPromise();
      this.router.navigate(['/login']);
      return response;
    } catch (error) {
      return error;
    }
  }

  async login(email: string, password: string) {
    const url = environment.apiUrl + '/v1/auth/login/';
    try {
      const response: any = await this.httpClient.post(url, { email, password }).toPromise();
      localStorage.setItem('access_token', response.access_token);
      this.router.navigate(['']);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateUser(email: string, password: string) {
    const url = environment.apiUrl + '/v1/auth/user/';
    try {
      const response: any = await this.httpClient.post(url, { email, password }).toPromise();
      this.userUpdated.emit();
      return response;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
}
