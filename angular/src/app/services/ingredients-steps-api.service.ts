import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsStepsApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIngredientsList(): Observable<any> {
    return this.http.get(`${this.API_URL}/ingredients-list`);
  }

  getAllIngredients(): Observable<any> {
    return this.http.get(`${this.API_URL}/ingredients`);
  }

  deleteOneIngredient(ingredientId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/ingredients/${ingredientId}`);
  }

  getStepsList(): Observable<any> {
    return this.http.get(`${this.API_URL}/steps-list`);
  }

  getAllSteps(): Observable<any> {
    return this.http.get(`${this.API_URL}/steps`);
  }

  deleteOneStep(stepId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/steps/${stepId}`);
  }
}
