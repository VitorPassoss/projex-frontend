import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async register(email: string, password: string) {
    const url = 'https://your-api-url.com/register';
    try {
      const response = await axios.post(url, { email, password });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async login(email: string, password: string) {
    const url = 'https://your-api-url.com/login';
    try {
      const response = await axios.post(url, { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
