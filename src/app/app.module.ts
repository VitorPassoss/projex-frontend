import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormpropsComponent } from './pages/formprops/formprops.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Importa o ReactiveFormsModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfilesComponent } from './pages/profiles/profiles.component'; // Importe o MatSnackBarModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SellPropertyDialogComponent } from './components/sell-property-dialog/sell-property-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';  // Importe MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importe MatInputModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    HeaderComponent,
    PropertiesComponent,
    DashboardComponent,
    FormpropsComponent,
    ProfilesComponent,
    SellPropertyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,  // Adicione MatFormFieldModule
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
