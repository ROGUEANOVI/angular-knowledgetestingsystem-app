import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionaryService } from 'src/app/shared/services/questionary.service';
import { TestService } from 'src/app/shared/services/test.service';
import { Test } from 'src/app/shared/interfaces/test.interface';
import { Questionary } from 'src/app/shared/interfaces/questionary.interface';

@Component({
  selector: 'app-add-questionary',
  templateUrl: './add-questionary.component.html',
  styleUrls: ['./add-questionary.component.css'],
})
export class AddQuestionaryComponent implements OnInit {
  questionaryForm!: FormGroup;
  disabledSaveButton: boolean = true;
  tests!: Test[];

  constructor(
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

    this.questionaryForm.valueChanges.subscribe(() => {
      this.disabledSaveButton = this.questionaryForm.invalid;
    });
  }

  ngOnInit(): void {
    this.getTestList();
  }

  getTestList() {
    this.testService.getTestsList().subscribe({
      next: (res: Test[]) => {
        res;
        this.tests = res;
      },
    });
  }

  addQuestionary() {
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

    this.questionaryService.addQuestionary(questionary).subscribe({
      next: (res) => {
        res;
        this.router.navigate(['/admin/questionnaires']);
        Swal.fire({
          icon: 'success',
          title: 'Agregar Cuestionario',
          text: 'El cuestionario se ha agregado exitosamente',
          showConfirmButton: true,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Agregar Cuestionario',
            text: 'Ocurrio un error agregando el cuestionario',
            showConfirmButton: true,
          });
        }
        err;
      },
    });
  }
}
