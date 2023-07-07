import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Test } from 'src/app/shared/interfaces/test.interface';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css'],
})
export class TestsListComponent implements OnInit {
  tests!: Test[];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.getTestsList();
  }

  getTestsList() {
    this.testService.getTestsList().subscribe({
      next: (res: Test[]) => {
        res;
        this.tests = res;
      },
    });
  }

  deleteTest(testId: number) {
    Swal.fire({
      icon: 'question',
      title: 'Eliminar Test',
      text: '¿Esta seguro de eliminar este test?',
      showConfirmButton: true,
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.deleteTest(testId).subscribe({
          next: (res: Test) => {
            res;

            this.tests = this.tests.filter((test) => test.testId != res.testId);

            Swal.fire({
              icon: 'success',
              title: 'Eliminar Test',
              text: `Se elimino el test con id: ${testId} exitosamente`,
              showConfirmButton: true,
            });
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 404) {
              Swal.fire({
                icon: 'error',
                title: 'Eliminar Test',
                text: `No se encontro el test con id: ${testId}`,
                showConfirmButton: true,
              });
            }
          },
        });
      }
    });
  }
}
