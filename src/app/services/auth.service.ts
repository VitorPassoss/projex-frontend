import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  async register(username: string, password: string) {
    const url = 'http://localhost:8000/auth/register/v1';
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
    const url = 'http://localhost:8000/auth/login/v1';
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
}
