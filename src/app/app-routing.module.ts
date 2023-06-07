import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '',  component: HomeComponent, canActivate: [JwtAuthGuard] },
  { path: 'register',  component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
