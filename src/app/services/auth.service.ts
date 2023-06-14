import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
    const url = 'http://localhost:8000/v1/auth/register/';
    try {
      const response = await axios.post(url, { username, password });
      this.router.navigate(['/login']);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async login(email: string, password: string) {
    const url = 'http://localhost:8000/v1/auth/login/';
    try {
      const response = await axios.post(url, { email, password });
      localStorage.setItem('access_token', response.data.access_token);
      this.router.navigate(['']);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUser(email:string, password:string){
    const url = 'http://localhost:8000/v1/auth/user/';
    try {
      const response = await this.httpClient.post(url, { email, password }).toPromise();
      this.userUpdated.emit();
      return response
    } catch (err) {
      console.error(err);
      return null
    }
  }

  async logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

}
