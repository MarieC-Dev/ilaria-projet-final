import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService {
  API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/recipes`);
  }

  createRecipe(recipe: any): Observable<any> {
    return this.http.post(`${this.API_URL}/recipes`, recipe).pipe(
      catchError((error) => {
        console.log('recipe api post error :', error);
        return throwError(() => error);
      })
    );
  }
}
