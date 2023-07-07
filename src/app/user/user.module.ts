import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TestsListComponent } from './pages/tests-list/tests-list.component';
import { TestInstructionsComponent } from './pages/test-instructions/test-instructions.component';
import { TakeTestComponent } from './pages/take-test/take-test.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserDashboardComponent,
    SidebarComponent,
    UserProfileComponent,
    WelcomeComponent,
    TestsListComponent,
    TestInstructionsComponent,
    TakeTestComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class UserModule {}
