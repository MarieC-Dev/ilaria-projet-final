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

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, user);
  }
}
