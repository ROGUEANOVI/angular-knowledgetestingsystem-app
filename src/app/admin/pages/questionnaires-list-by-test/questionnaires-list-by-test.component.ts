import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Questionary } from 'src/app/shared/interfaces/questionary.interface';
import { QuestionaryService } from 'src/app/shared/services/questionary.service';

@Component({
  selector: 'app-questionnaires-list-by-test',
  templateUrl: './questionnaires-list-by-test.component.html',
  styleUrls: ['./questionnaires-list-by-test.component.css'],
})
export class QuestionnairesListByTestComponent implements OnInit {
  testId: number;
  testTitle: string;
  questionnaires!: Questionary[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionaryService: QuestionaryService
  ) {
    this.testId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('testId')!
    );
    this.testTitle = this.activatedRoute.snapshot.paramMap.get('title')!;
  }

  ngOnInit(): void {
    this.getQuestionnairesByTest();
  }

  getQuestionnairesByTest() {
    this.questionaryService.getQuestinnairesListByTest(this.testId).subscribe({
      next: (res) => {
        this.questionnaires = res;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Obtener cuestionarios del test',
            text: `No se encontraron cuestionarios para el test '${this.testTitle}'`,
          });
        }
      },
    });
  }

  deleteQuestionary(questionaryId: number) {
    Swal.fire({
      icon: 'question',
      title: 'Eliminar Cuestionario',
      text: '¿Esta seguro de eliminar este cuestionario?',
      showConfirmButton: true,
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionaryService.deleteQuestionary(questionaryId).subscribe({
          next: (res: Questionary) => {
            res;

            this.questionnaires = this.questionnaires.filter(
              (questionary) => questionary.questionaryId != res.questionaryId
            );

            Swal.fire({
              icon: 'success',
              title: 'Eliminar Cuestionario',
              text: 'Se elimino el Cuestionario exitosamente',
              showConfirmButton: true,
            });
          },
          error: (err: HttpErrorResponse) => {
            err;
            if (err.status === 404) {
              Swal.fire({
                icon: 'error',
                title: 'Eliminar Cuestionario',
                text: `El cuestionario con id: ${questionaryId} no se ha encontrado`,
                showConfirmButton: true,
              });
            }
          },
        });
      }
    });
  }
}
