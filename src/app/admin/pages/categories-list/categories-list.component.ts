import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService) {}

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

  deleteCategory(categoryId: number) {
    Swal.fire({
      icon: 'question',
      title: 'Eliminar Categoria',
      text: '¿Esta seguro de eliminar esta categoria?',
      showConfirmButton: true,
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: (res: Category) => {
            res;

            this.categories = this.categories.filter(
              (category) => category.categoryId != res.categoryId
            );

            Swal.fire({
              icon: 'success',
              title: 'Eliminar Categoria',
              text: 'Se elimino la categoria exitosamente',
              showConfirmButton: true,
            });
          },
          error: (err: HttpErrorResponse) => {
            err;

            if (err.status === 404) {
              Swal.fire({
                icon: 'error',
                title: 'Eliminar Categoria',
                text: `La categoria con id: ${categoryId} no se ha encontrado`,
                showConfirmButton: true,
              });
            }
          },
        });
      }
    });
  }
}
