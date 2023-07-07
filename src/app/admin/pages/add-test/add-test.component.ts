import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { TestService } from 'src/app/shared/services/test.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Test } from 'src/app/shared/interfaces/test.interface';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
})
export class AddTestComponent implements OnInit {
  testForm!: FormGroup;
  disabledSaveButton: boolean = true;
  categories!: Category[];

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.testForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      maximumPoints: [
        '',
        [Validators.required, Validators.min(50), Validators.max(1000)],
      ],
      numberQuestionnaires: [
        '',
        [Validators.required, Validators.min(5), Validators.max(20)],
      ],
      state: [true, [Validators.required]],
      categoryId: ['', [Validators.required, Validators.min(1)]],
    });

    this.testForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.testForm.invalid;
    });
  }

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

  addTest() {
    const test: Test = {
      title: this.testForm.get('title')?.value,
      description: this.testForm.get('description')?.value,
      maximumPoints: this.testForm.get('maximumPoints')?.value,
      numberQuestionnaires: this.testForm.get('numberQuestionnaires')?.value,
      state: this.testForm.get('state')?.value,
      category: {
        categoryId: this.testForm.get('categoryId')?.value,
      },
    };

    this.testService.addTest(test).subscribe({
      next: (res) => {
        res;
        this.router.navigate(['/admin/tests']);
        Swal.fire({
          icon: 'success',
          title: 'Agregar Test',
          text: 'El test se ha agregado exitosamente',
          showConfirmButton: true,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Agregar Test',
            text: 'Ocurrio un error agregando el test',
            showConfirmButton: true,
          });
        }
        err;
      },
    });
  }
}
