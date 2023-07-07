import { Component, OnInit } from '@angular/core';
import {
  ResponseUserLoggedInApi,
  UserLoggedIn,
} from '../../../auth/interfaces/response-user-loggedin.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: UserLoggedIn;
  constructor(private authService: AuthService) {
    this.getUserLoggedIn();
  }

  ngOnInit(): void {
    this.getUserLoggedIn();
  }

  getUserLoggedIn() {
    this.authService.getUserLoggedIn().subscribe({
      next: (res: ResponseUserLoggedInApi) => {
        this.user = res.data;
      },
    });
  }
}
