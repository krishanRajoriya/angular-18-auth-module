import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [authGuard]  },
    { path: 'register', component: RegisterComponent, canActivate: [authGuard]  },
    {
        path: 'home',
        canActivate: [authGuard],
        children: [
            { path: '', component: HomeComponent },
        ]
     },
    { path: '**', component: LoginComponent , canActivate: [authGuard] },
];
