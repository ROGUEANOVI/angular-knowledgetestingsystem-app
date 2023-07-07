import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/pages/home/home.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'admin',
    component: DashboardComponent,
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
