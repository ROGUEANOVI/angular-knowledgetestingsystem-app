import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Questionary } from '../interfaces/questionary.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionaryService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getQuestionnairesList(): Observable<Questionary[]> {
    return this.http.get<Questionary[]>(`${this.url}/questionary/`);
  }

  public evaluateQuestionnaires(
    questionnaires: Questionary[]
  ): Observable<any> {
    return this.http.post<any>(
      `${this.url}/questionary/test/evaluate-test`,
      questionnaires
    );
  }

  public getQuestionaryById(questionaryId: number): Observable<Questionary> {
    return this.http.get<Questionary>(
      `${this.url}/questionary/${questionaryId}`
    );
  }

  public getQuestinnairesListByTest(testId: number): Observable<Questionary[]> {
    return this.http.get<Questionary[]>(
      `${this.url}/questionary/test/${testId}`
    );
  }

  public addQuestionary(questionary: Questionary): Observable<Questionary> {
    return this.http.post<Questionary>(`${this.url}/questionary/`, questionary);
  }

  public editQuestionary(
    questionaryId: number,
    questionary: Questionary
  ): Observable<Questionary> {
    return this.http.put<Questionary>(
      `${this.url}/questionary/${questionaryId}`,
      questionary
    );
  }

  public deleteQuestionary(questionaryId: number): Observable<Questionary> {
    return this.http.delete<Questionary>(
      `${this.url}/questionary/${questionaryId}`
    );
  }
}
