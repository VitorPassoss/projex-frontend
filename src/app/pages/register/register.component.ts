import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    title = 'Cadastro';
    registerForm: FormGroup = this.formBuilder.group({});
  
    constructor(
      private authService: AuthService,
      private titleService: Title,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar
      ) { }

    ngOnInit() {
      this.titleService.setTitle(this.title);
  
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(1)]]
      });
    }

    async cadastro(){
      if (this.registerForm.valid) {
        const email = this.registerForm.get('email')!.value;
        const password = this.registerForm.get('password')!.value;
        try {
          let response = await this.authService.register(email, password);
          if(response.error){
            this.snackBar.open('error!', response.error?.username, {
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
