import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthenticationGuard } from '@app/auth';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard], data: { title: 'Home' } }
];
