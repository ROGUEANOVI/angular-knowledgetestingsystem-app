import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryId: number;
  categoryForm: FormGroup;
  disabledSaveButton: boolean = true;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.categoryId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('categoryId')!
    );

    this.categoryForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.categoryForm.invalid;
    });
  }

  ngOnInit(): void {
    this.getCategoryById(this.categoryId);
  }

  getCategoryById(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (res: Category) => {
        this.categoryForm.setValue({
          title: res.title,
          description: res.description,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['/admin/categories']);
          Swal.fire({
            icon: 'error',
            title: 'Editar Categoria',
            text: `Categoria con id: ${categoryId} no se ha encontrada`,
            showConfirmButton: true,
          });
        }
      },
    });
  }

  editCategory() {
    const category: Category = {
      categoryId: this.categoryId,
      title: this.categoryForm.get('title')?.value,
      description: this.categoryForm.get('description')?.value,
    };

    this.categoryService.editCategory(this.categoryId, category).subscribe({
      next: (res: Category) => {
        res;
        this.router.navigate(['/admin/categories']);
        Swal.fire({
          icon: 'success',
          title: 'Editar Categoria',
          text: 'Categoria editada exitosamente',
          showConfirmButton: true,
        });
      },
      error: (err: HttpErrorResponse) => {
        err;
        if (err.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Editar Categoria',
            text: `Categoria con id: ${this.categoryId} no ha sido encontrada`,
            showConfirmButton: true,
          });
        }
      },
    });
  }
}
