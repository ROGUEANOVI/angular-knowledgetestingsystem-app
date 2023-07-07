import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from '../auth/guards/auth-user.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TestsListComponent } from './pages/tests-list/tests-list.component';
import { TestInstructionsComponent } from './pages/test-instructions/test-instructions.component';
import { TakeTestComponent } from './pages/take-test/take-test.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    pathMatch: 'full',
    canActivate: [AuthUserGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'tests',
    component: TestsListComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'tests/category/:categoryId',
    component: TestsListComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'tests/instructions/:testId',
    component: TestInstructionsComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'tests/take-test/:testId',
    component: TakeTestComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
