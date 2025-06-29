import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addFavorite(favorite: any): Observable<any> {
    return this.http.post(`${this.API_URL}/favorite`, favorite, {
      withCredentials: true
    })
  }
}
