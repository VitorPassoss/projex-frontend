import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  async login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if (this.email && this.password) {
      await this.authService.login(this.email, this.password);
    }
  }

}
