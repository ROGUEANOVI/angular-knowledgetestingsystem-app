import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Test } from 'src/app/shared/interfaces/test.interface';
import { QuestionaryService } from 'src/app/shared/services/questionary.service';
import { TestService } from 'src/app/shared/services/test.service';
import { Questionary } from 'src/app/shared/interfaces/questionary.interface';

@Component({
  selector: 'app-edit-questionary',
  templateUrl: './edit-questionary.component.html',
  styleUrls: ['./edit-questionary.component.css'],
})
export class EditQuestionaryComponent implements OnInit {
  questionaryId: number;
  questionaryForm!: FormGroup;
  disabledSaveButton: boolean = true;
  tests!: Test[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private questionaryService: QuestionaryService,
    private testService: TestService,
    private router: Router
  ) {
    this.questionaryForm = this.fb.group({
      ask: ['', [Validators.required, Validators.minLength(8)]],
      option1: ['', [Validators.required, Validators.minLength(8)]],
      option2: ['', [Validators.required, Validators.minLength(8)]],
      option3: ['', [Validators.required, Validators.minLength(8)]],
      option4: ['', [Validators.required, Validators.minLength(8)]],
      answer: ['', [Validators.required, Validators.minLength(8)]],
      image: ['', [Validators.required, Validators.minLength(5)]],
      testId: ['', [Validators.required, Validators.min(1)]],
    });

    this.questionaryId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('questionaryId')!
    );

    this.questionaryForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.questionaryForm.invalid;
    });
  }

  ngOnInit(): void {
    this.getTestList();
    this.loadDataForm(this.questionaryId);
  }

  getTestList() {
    this.testService.getTestsList().subscribe({
      next: (res: Test[]) => {
        res;
        this.tests = res;
      },
    });
  }

  loadDataForm(questionaryId: number) {
    this.questionaryService.getQuestionaryById(questionaryId).subscribe({
      next: (res: Questionary) => {
        this.questionaryForm.setValue({
          ask: res.ask,
          option1: res.option1,
          option2: res.option2,
          option3: res.option3,
          option4: res.option4,
          answer: res.answer,
          image: res.image,
          testId: res.test!.testId,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['/admin/questionnaires']);
          Swal.fire({
            icon: 'error',
            title: 'Editar Cuestionario',
            text: `Cuestionario con id: ${questionaryId} no se ha encontrado`,
            showConfirmButton: true,
          });
        }
      },
    });
  }

  editQuestionary() {
    const questionary: Questionary = {
      ask: this.questionaryForm.get('ask')?.value,
      option1: this.questionaryForm.get('option1')?.value,
      option2: this.questionaryForm.get('option2')?.value,
      option3: this.questionaryForm.get('option3')?.value,
      option4: this.questionaryForm.get('option4')?.value,
      answer: this.questionaryForm.get('answer')?.value,
      image: this.questionaryForm.get('image')?.value,
      test: {
        testId: this.questionaryForm.get('testId')?.value,
      },
    };

    this.questionaryService
      .editQuestionary(this.questionaryId, questionary)
      .subscribe({
        next: (res) => {
          res;
          this.router.navigate(['/admin/questionnaires']);
          Swal.fire({
            icon: 'success',
            title: 'Editar Cuestionario',
            text: 'Cuestionario editado exitosamente',
            showConfirmButton: true,
          });
        },
        error: (err: HttpErrorResponse) => {
          err;
          if (err.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'Editar Cuestionario',
              text: `Cuestionario con id: ${this.questionaryId} no ha sido encontrado`,
              showConfirmButton: true,
            });
          }
        },
      });
  }
}
