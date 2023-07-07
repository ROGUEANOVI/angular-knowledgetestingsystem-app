import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import Swal from 'sweetalert2';

import { AuthService } from '../../../auth/services/auth.service';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  registerForm: FormGroup;
  disabledSaveButton: boolean = true;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      username: [
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
      profile: ['', Validators.required],
    });

    this.registerForm.get('firstName')?.valueChanges.subscribe((value) => {
      this.registerForm.get('firstName')?.setValue(
        value.replace(/\w\S*/g, (w: string) =>
          w.replace(/^\w/, (c: string) => c.toUpperCase())
        ),
        { emitEvent: false }
      );
    });

    this.registerForm.get('lastName')?.valueChanges.subscribe((value) => {
      this.registerForm.get('lastName')?.setValue(
        value.replace(/\w\S*/g, (w: string) =>
          w.replace(/^\w/, (c: string) => c.toUpperCase())
        ),
        { emitEvent: false }
      );
    });

    this.registerForm.get('username')?.valueChanges.subscribe((value) => {
      this.registerForm
        .get('username')
        ?.setValue(value.toLowerCase(), { emitEvent: false });
    });

    this.registerForm.get('email')?.valueChanges.subscribe((value) => {
      this.registerForm
        .get('email')
        ?.setValue(value.toLowerCase(), { emitEvent: false });
    });

    this.registerForm.get('profile')?.valueChanges.subscribe((value) => {
      this.registerForm
        .get('profile')
        ?.setValue(value.toLowerCase(), { emitEvent: false });
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.registerForm.invalid;
    });
  }

  register() {
    const user: RegisterUser = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      profile: this.registerForm.get('profile')?.value,
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        if (res !== null && res.isSuccessful) {
          this.registerForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Registro de Usuario',
            text: 'El usuario ha sido registrado con exito',
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            } else if (result.isDismissed) {
              this.router.navigate(['/login']);
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Registro de Usuario',
            text: 'Username o Email ya esta en uso',
            showConfirmButton: true,
          });
        } else if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Registro de Usuario',
            text: `No esta autorizado para realizar registros de usuarios`,
            showConfirmButton: true,
          });
        } else if (err.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Registro de Usuario',
            text: `${err.error}`,
            showConfirmButton: true,
          });
        }
        err;
      },
    });
  }
}
