import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarService } from 'src/app/services/sidebar.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: IUser | null = null; 
  private userUpdateSubscription: Subscription | null = null;
// Novo membro da classe para manter o usuário recuperado

  constructor(
    public sidebarService: SidebarService,
    private httpClient: HttpClient,
    public authService: AuthService
    ) { }
   

   ngOnInit() {
    this.getDataUser();

    this.userUpdateSubscription = this.authService.userUpdated.subscribe(() => {
      this.getDataUser(); // Recarrega os dados quando o usuário for atualizado
    });
   }

   ngOnDestroy() {
    if (this.userUpdateSubscription) {
      this.userUpdateSubscription.unsubscribe(); // Evita vazamentos de memória ao sair do componente
    }
  }

   async getDataUser() {
    const url = 'http://localhost:8000/v1/auth/user/';
    
    try {
      const response = await this.httpClient.get<{ user:IUser }>(url).toPromise();
      if (response){
        this.user = response.user; // Armazenando o usuário recuperado
      }
    } catch (error) {
      console.error(error)
    }
  }

 
}
