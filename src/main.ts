import { bootstrapApplication } from '@angular/platform-browser';//El main siempre tiene esta linea
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';//permite enrutar
import { RegisterComponent } from './app/register/register';
import { HomeComponent } from './app/home/home';
import { LoginComponent } from './app/login/login'; //tiene llaves porque es un destructuring


const routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
  
];

bootstrapApplication(HomeComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
});

