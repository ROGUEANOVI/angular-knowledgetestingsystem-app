import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginUser } from '../../../auth/interfaces/login-user.interface';
import { ResponseTokenApi } from '../../../auth/interfaces/response-token.interface';
import { ResponseUserLoggedInApi } from '../../../auth/interfaces/response-user-loggedin.interface';
import { AuthService } from '../../../auth/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
    });

    this.loginForm.get('usernameOrEmail')?.valueChanges.subscribe((value) => {
      this.loginForm
        .get('usernameOrEmail')
        ?.setValue(value.toLowerCase(), { emitEvent: false });
    });
  }

  ngOnInit(): void {}

  login() {
    const user: LoginUser = {
      usernameOrEmail: this.loginForm.get('usernameOrEmail')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.authenticate(user).subscribe({
      next: (res: ResponseTokenApi) => {
        if (res.isSuccessful) {
          const token = res.data.token;
          this.authService.setTokenInCookie(token!);

          this.authService.getUserLoggedIn().subscribe({
            next: (res: ResponseUserLoggedInApi) => {
              const username = res.data.username;
              this.authService.setUsernameInCookie(username);
              this.authService.login(username);

              const userRole = res.data.authorities[0].authority;
              this.authService.setUserRoleInCookie(userRole);

              this.router.navigate([userRole === 'ADMIN' ? '/admin' : '/user']);
            },
            error(err) {
              Swal.fire({
                icon: 'error',
                title: 'Inicio de Sesión',
                text: 'Username o contraseña incorrectos',
                showConfirmButton: true,
              });
              err;
            },
          });
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión',
            text: 'Has Iniciado Sesión con exito',
            showConfirmButton: true,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Inicio de Sesión',
          text: 'Username o contraseña incorrectos',
          showConfirmButton: true,
        });
        err;
      },
    });
  }
}
