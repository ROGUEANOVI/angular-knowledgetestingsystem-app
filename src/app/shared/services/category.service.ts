import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/category/`);
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/category/${categoryId}`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.url}/category/`, category);
  }

  public editCategory(
    categoryId: number,
    category: Category
  ): Observable<Category> {
    return this.http.put<Category>(
      `${this.url}/category/${categoryId}`,
      category
    );
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/category/${categoryId}`);
  }
}
