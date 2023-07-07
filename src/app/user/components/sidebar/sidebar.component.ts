import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories!: Category[];

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categoryService.getCategoriesList().subscribe({
      next: (res: Category[]) => {
        res;
        this.categories = res;
      },
    });
  }

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
