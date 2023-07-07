import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  disabledSaveButton: boolean = true;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.categoryForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.categoryForm.invalid;
    });
  }

  addCategory() {
    const category: Category = {
      title: this.categoryForm.get('title')?.value,
      description: this.categoryForm.get('description')?.value,
    };

    this.categoryService.addCategory(category).subscribe({
      next: (res) => {
        res;
        this.router.navigate(['/admin/categories']);
        Swal.fire({
          icon: 'success',
          title: 'Agregar Categoria',
          text: 'La categoria se ha agregado exitosamente',
          showConfirmButton: true,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Agregar Categoria',
            text: 'Ocurrio un error agregando la categoria',
            showConfirmButton: true,
          });
        }
        err;
      },
    });
  }
}
