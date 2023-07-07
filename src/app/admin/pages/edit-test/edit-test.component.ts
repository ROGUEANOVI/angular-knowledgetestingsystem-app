import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { TestService } from 'src/app/shared/services/test.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Test } from 'src/app/shared/interfaces/test.interface';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css'],
})
export class EditTestComponent implements OnInit {
  testId: number;
  testForm: FormGroup;
  categories!: Category[];
  disabledSaveButton: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
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

    this.testId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('testId')!
    );

    this.testForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.testForm.invalid;
    });
  }

  ngOnInit(): void {
    this.getCategoriesList();
    this.loadDataForm(this.testId);
  }

  getCategoriesList() {
    this.categoryService.getCategoriesList().subscribe({
      next: (res: Category[]) => {
        res;
        this.categories = res;
      },
    });
  }

  loadDataForm(testId: number) {
    this.testService.getTestById(testId).subscribe({
      next: (res: Test) => {
        this.testForm.setValue({
          title: res.title,
          description: res.description,
          maximumPoints: res.maximumPoints,
          numberQuestionnaires: res.numberQuestionnaires,
          state: res.state,
          categoryId: res.category!.categoryId,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['/admin/tests']);
          Swal.fire({
            icon: 'error',
            title: 'Editar Test',
            text: `Test con id: ${testId} no se ha encontrado`,
            showConfirmButton: true,
          });
        }
      },
    });
  }

  editTest() {
    const test: Test = {
      testId: this.testId,
      title: this.testForm.get('title')?.value,
      description: this.testForm.get('description')?.value,
      maximumPoints: this.testForm.get('maximumPoints')?.value,
      numberQuestionnaires: this.testForm.get('numberQuestionnaires')?.value,
      state: this.testForm.get('state')?.value,
      category: {
        categoryId: this.testForm.get('categoryId')?.value,
      },
    };

    this.testService.editTest(this.testId, test).subscribe({
      next: (res: Test) => {
        res;
        this.router.navigate(['/admin/categories']);
        Swal.fire({
          icon: 'success',
          title: 'Editar Test',
          text: 'Test editado exitosamente',
          showConfirmButton: true,
        });
      },
      error: (err: HttpErrorResponse) => {
        err;
        if (err.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Editar Test',
            text: `Test con id: ${this.testId} no ha sido encontrado`,
            showConfirmButton: true,
          });
        }
      },
    });
  }
}
