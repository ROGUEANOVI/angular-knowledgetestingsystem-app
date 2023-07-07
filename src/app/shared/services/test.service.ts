import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Test } from '../interfaces/test.interface';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTestsList(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/test/`);
  }

  public getActiveTestsList(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/test/active`);
  }

  public getTestsListByCategory(categoryId: number): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/test/category/${categoryId}`);
  }

  public getTestsListByActiveCategory(categoryId: number): Observable<Test[]> {
    return this.http.get<Test[]>(
      `${this.url}/test/category/active/${categoryId}`
    );
  }

  public getTestById(testId: number): Observable<Test> {
    return this.http.get<Test>(`${this.url}/test/${testId}`);
  }

  public addTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.url}/test/`, test);
  }

  public editTest(testId: number, test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.url}/test/${testId}`, test);
  }

  public deleteTest(testId: number): Observable<Test> {
    return this.http.delete<Test>(`${this.url}/test/${testId}`);
  }
}
