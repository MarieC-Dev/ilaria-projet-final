import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService {
  API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllUserFavorites(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${userId}/favorite`);
  }
}
