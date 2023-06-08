import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    username: string = '';
    password: string ='';

    constructor(private authService: AuthService) { }

    async cadastro(){
      
        if (this.username && this.password) {
          await this.authService.register(this.username, this.password);
        }
    }


}
