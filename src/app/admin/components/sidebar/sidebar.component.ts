import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
}
