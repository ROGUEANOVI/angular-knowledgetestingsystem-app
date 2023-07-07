import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Questionary } from 'src/app/shared/interfaces/questionary.interface';
import { QuestionaryService } from 'src/app/shared/services/questionary.service';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.css'],
})
export class QuestionnairesListComponent implements OnInit {
  questionnaires!: Questionary[];

  constructor(private questionaryService: QuestionaryService) {}

  ngOnInit(): void {
    this.getQuestionnairesList();
  }

  getQuestionnairesList() {
    this.questionaryService.getQuestionnairesList().subscribe({
      next: (res: Questionary[]) => {
        res;
        this.questionnaires = res;
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
