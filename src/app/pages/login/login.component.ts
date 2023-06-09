import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Title }     from '@angular/platform-browser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  title = 'Login';


  constructor(
    private authService: AuthService,
    private titleService: Title
  ) { }

  public ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  async login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if (this.email && this.password) {
      await this.authService.login(this.email, this.password);
    }
  }


}
