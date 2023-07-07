import { Component, OnInit } from '@angular/core';
import {
  ResponseUserLoggedInApi,
  UserLoggedIn,
} from 'src/app/auth/interfaces/response-user-loggedin.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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
