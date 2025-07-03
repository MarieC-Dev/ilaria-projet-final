import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeTimeApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllRecipeTime(): Observable<any> {
    return this.http.get(`${this.API_URL}/recipe-time`);
  }

  getOneRecipeTime(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/recipe-time/${id}`);
  }
}
