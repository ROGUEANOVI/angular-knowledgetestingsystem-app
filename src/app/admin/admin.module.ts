import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { TestsListComponent } from './pages/tests-list/tests-list.component';
import { AddTestComponent } from './pages/add-test/add-test.component';
import { AddQuestionaryComponent } from './pages/add-questionary/add-questionary.component';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { EditTestComponent } from './pages/edit-test/edit-test.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditQuestionaryComponent } from './pages/edit-questionary/edit-questionary.component';
import { QuestionnairesListByTestComponent } from './pages/questionnaires-list-by-test/questionnaires-list-by-test.component';
import { AddQuestionaryByTestComponent } from './pages/add-questionary-by-test/add-questionary-by-test.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ProfileComponent,
    WelcomeComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    TestsListComponent,
    AddTestComponent,
    AddQuestionaryComponent,
    QuestionnairesListComponent,
    EditTestComponent,
    EditCategoryComponent,
    EditQuestionaryComponent,
    QuestionnairesListByTestComponent,
    AddQuestionaryByTestComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
