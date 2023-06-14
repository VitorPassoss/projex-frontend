import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PropertiesComponent } from './pages/properties/properties.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormpropsComponent } from './pages/formprops/formprops.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { 
    path: '',  
    component: HomeComponent, 
    canActivate: [JwtAuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfilesComponent,
        canActivate: [JwtAuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [JwtAuthGuard],
      },
      {
        path: '',
        component: PropertiesComponent,
        canActivate: [JwtAuthGuard],
      },
      {
        path: 'properties/create',
        component: FormpropsComponent,
        canActivate: [JwtAuthGuard],
      }
    ] },
  { path: 'register',  component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
