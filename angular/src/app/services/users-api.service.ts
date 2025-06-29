import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, user, {
      withCredentials: true
    })
  }

  getOneUser(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${id}`);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, user, {
      withCredentials: true
    });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${id}`, user, {
      withCredentials: true
    })
  }
}
