import { Component } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/app/environment.custom';





@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  title = 'Meu Perfil';
  updForm: FormGroup = this.formBuilder.group({});


  public constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private authService: AuthService// injete o HttpClient aqui

    ) { }

  public ngOnInit() {
    this.titleService.setTitle(this.title);
    this.updForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.getDataUser()
    
  }


  async getDataUser() {
    const url = environment.apiUrl + '/v1/auth/user/';

    try {
      const response = await this.httpClient.get<{ user:IUser }>(url).toPromise();
      if (response){
        const email = response.user.username
        this.updForm.patchValue({
          email: email
        })
      }
    } catch (error) {
      console.error(error)
    }
}


  async updateUser() {
    if (this.updForm.valid) {
      const email = this.updForm.get('email')!.value;
      const password = this.updForm.get('password')!.value;
      
      try {
        await this.authService.updateUser(email,password)
        this.snackBar.open('User update successfully!', 'Close', { duration: 2000 });
      }catch(err){
        this.snackBar.open('An error occurred while update the user', 'Close', { duration: 2000 });
      }
    }else {
      this.snackBar.open('Preencha corretamente o formulário!', 'Fechar', {
        duration: 2000,
      });
    }
  } 
}
