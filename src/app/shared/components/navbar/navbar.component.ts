import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username$ = this.authService.username$;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar Sesión',
      text: '¿Esta seguro que quiere cerrar sesión?',
      showConfirmButton: true,
      confirmButtonText: 'Si, Cerrar Sesión',
      showCancelButton: true,
      cancelButtonColor: 'No, Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  goToProfile() {
    const userRole = this.authService.getUserRoleFromCookie();
    this.router.navigate([
      `${userRole === 'ADMIN' ? '/admin/profile' : '/user/profile'}`,
    ]);
  }
}
