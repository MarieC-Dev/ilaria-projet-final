import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllFavorites(): Observable<any> {
    return this.http.get(`${this.API_URL}/favorite`);
  }

  getAllUserFavorites(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${userId}/favorite`);
  }

  addFavorite(favorite: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users/${favorite.userId}/favorite`, favorite, {
      withCredentials: true
    })
  }

  deleteFavorite(userId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/${userId}/favorite`);
  }
}
