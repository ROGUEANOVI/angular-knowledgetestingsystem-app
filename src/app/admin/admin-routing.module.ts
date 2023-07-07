import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthAdminGuard } from '../auth/guards/auth-admin.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { TestsListComponent } from './pages/tests-list/tests-list.component';
import { AddTestComponent } from './pages/add-test/add-test.component';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { AddQuestionaryComponent } from './pages/add-questionary/add-questionary.component';
import { EditTestComponent } from './pages/edit-test/edit-test.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditQuestionaryComponent } from './pages/edit-questionary/edit-questionary.component';
import { QuestionnairesListByTestComponent } from './pages/questionnaires-list-by-test/questionnaires-list-by-test.component';
import { AddQuestionaryByTestComponent } from './pages/add-questionary-by-test/add-questionary-by-test.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    pathMatch: 'full',
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'edit-category/:categoryId',
    component: EditCategoryComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'tests',
    component: TestsListComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'add-test',
    component: AddTestComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'edit-test/:testId',
    component: EditTestComponent,
    canActivate: [AuthAdminGuard],
  },

  {
    path: 'questionnaires',
    component: QuestionnairesListComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'add-questionary',
    component: AddQuestionaryComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'add-questionary-by-test/:testId/:testTitle',
    component: AddQuestionaryByTestComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'edit-questionary/:questionaryId',
    component: EditQuestionaryComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'questionnaires-list/:testId/:title',
    component: QuestionnairesListByTestComponent,
    canActivate: [AuthAdminGuard],
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
export class AdminRoutingModule {}
