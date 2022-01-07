import { AnasayfaComponent } from './components/anasayfa/anasayfa.component';
import { HomeComponent } from './components/home/home.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {AngularFireAuthGuard ,redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { RegisterComponent } from './components/register/register.component';
import { EgitimkadrosuComponent } from './components/egitimkadrosu/egitimkadrosu.component';


const redirectLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {path: 'admin', component: KayitlarComponent,
  canActivate: [AngularFireAuthGuard],
  data:{
    authGuardPipe: redirectLogin},
  },
  {path: 
    'home',
     component:
     HomeComponent,
     canActivate: [AngularFireAuthGuard],
  data:{
    authGuardPipe: redirectLogin},
    },
  {path: 'login', component: LoginComponent, },
  {path: '', component: AnasayfaComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'egitimkadrosu', component: EgitimkadrosuComponent,
  canActivate: [AngularFireAuthGuard],
  data:{
    authGuardPipe: redirectLogin},},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

