import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/shared/interfaces/test.interface';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css'],
})
export class TestsListComponent implements OnInit {
  categoryId!: number;
  tests!: Test[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.categoryId = parseInt(param.get('categoryId')!);

      if (this.categoryId) {
        this.getTestsListByActiveCategory(this.categoryId);
      } else {
        this.getActiveTestsList();
      }
    });
  }

  getActiveTestsList() {
    this.testService.getActiveTestsList().subscribe({
      next: (res: Test[]) => {
        res;
        this.tests = res;
      },
    });
  }

  getTestsListByActiveCategory(categoryId: number) {
    this.testService.getTestsListByActiveCategory(categoryId).subscribe({
      next: (res: Test[]) => {
        res;
        this.tests = res;
      },
    });
  }
}
