import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/shared/interfaces/test.interface';
import { TestService } from 'src/app/shared/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-instructions',
  templateUrl: './test-instructions.component.html',
  styleUrls: ['./test-instructions.component.css'],
})
export class TestInstructionsComponent implements OnInit {
  testId: number;
  test!: Test;
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {
    this.testId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('testId')!
    );
  }
  ngOnInit(): void {
    this.testService.getTestById(this.testId).subscribe({
      next: (res) => {
        res;
        this.test = res;
      },
      error: (err) => {
        err;
      },
    });
  }

  startTest() {
    Swal.fire({
      icon: 'question',
      title: 'Iniciar Test',
      text: '¿Esta seguro de iniciar el test?',
      showConfirmButton: true,
      confirmButtonText: 'Si, Empezar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/user/tests/take-test', this.testId]);
      }
    });
  }
}
