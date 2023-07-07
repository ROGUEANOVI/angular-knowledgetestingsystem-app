import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questionary } from 'src/app/shared/interfaces/questionary.interface';
import { QuestionaryService } from 'src/app/shared/services/questionary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css'],
})
export class TakeTestComponent implements OnInit {
  testId: number;
  questionnaires!: Questionary[];
  pointsEarned = 0;
  correctAnswers = 0;
  attempts = 0;
  isSend: boolean = false;

  timer: any;

  constructor(
    private locationStrategy: LocationStrategy,
    private activatedRoute: ActivatedRoute,
    private questionaryService: QuestionaryService
  ) {
    this.testId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('testId')!
    );
  }

  ngOnInit(): void {
    this.preventBackButton();
    this.loadQuestionnaires();
  }

  preventBackButton() {
    history.pushState(null, null!, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  startTimer() {
    let time = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateTest();
        clearInterval(time);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;

    return `${mm}:${ss}`;
  }

  loadQuestionnaires() {
    this.questionaryService.getQuestinnairesListByTest(this.testId).subscribe({
      next: (res: Questionary[]) => {
        this.questionnaires = res;
        this.timer = this.questionnaires.length * 2 * 60;
        this.questionnaires.forEach((questionary: Questionary) => {
          questionary['selectedAnswer'] = '';
        });
        this.startTimer();
      },
      error: (err) => {
        err;
      },
    });
  }

  onSubmitQuestionnaires() {
    Swal.fire({
      icon: 'question',
      title: 'Enviar Cuestionario',
      text: '¿Estas seguro de enviar el cuestionario?',
      showConfirmButton: true,
      confirmButtonText: 'Si, seguro',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluateTest();
      }
    });
  }

  evaluateTest() {
    // this.isSend = true;
    // this.questionaryService
    //   .evaluateQuestionnaires(this.questionnaires)
    //   .subscribe({
    //     next: (res) => {
    //       ('RESPUESTA', res);

    //       this.isSend = true;
    //       this.pointsEarned = res.maximumPoints;
    //       this.correctAnswers = res.correctAnswer;
    //       this.attempts = res.attempts;
    //     },
    //     error: (err) => {
    //       (err);
    //     },
    //   });

    this.isSend = true;
    this.questionnaires.forEach((questionary: Questionary) => {
      if (questionary.selectedAnswer == questionary.answer) {
        this.correctAnswers++;
        let points =
          this.questionnaires[0].test.maximumPoints! /
          this.questionnaires.length;
        this.pointsEarned += points;
      }
      if (questionary.selectedAnswer!.trim() !== '') {
        this.attempts++;
      }
    });
  }

  printPage() {
    window.print();
  }
}
