<<<<<<< HEAD
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/video-games', pathMatch: 'full' },
  { path: 'video-games', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
=======
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/video-games', pathMatch: 'full' },
  { path: 'video-games', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
>>>>>>> dfc6a3ec6b0f9e432f017a1a6b718110807ecc6d
];