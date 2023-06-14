import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  loginForm: FormGroup = this.formBuilder.group({});

  constructor(
    private authService: AuthService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  
  async login() {

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      try {
        let response = await this.authService.login(email, password);
        if(response.error){
          this.snackBar.open('error!', response.error.message, {
            duration: 2000,
          });
        }  
      } catch (error) {
        console.log(error)
      }

    } else {
      this.snackBar.open('Preencha corretamente o formulário!', 'Fechar', {
        duration: 2000,
      });
    }
  }
}
